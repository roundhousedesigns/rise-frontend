import { useContext, useEffect } from 'react';
import {
	Button,
	useDisclosure,
	useToast,
	Stack,
	StackItem,
	Flex,
	IconButton,
	ButtonGroup,
	Spacer,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiSearch, FiSave, FiDelete, FiEdit2 } from 'react-icons/fi';
import { extractSearchTermIds, prepareSearchFilterSet } from '@lib/utils';
import { SearchFilterSetRaw } from '@lib/types';
import { SearchContext } from '@context/SearchContext';
import useCandidateSearch from '@hooks/queries/useCandidateSearch';
import useTaxonomyTerms from '@hooks/queries/useTaxonomyTerms';
import useViewer from '@hooks/queries/useViewer';
import useDeleteOwnSavedSearch from '@hooks/mutations/useDeleteOwnSavedSearch';
import SearchParamTags from '@common/SearchParamTags';
import ConfirmActionDialog from '@common/ConfirmActionDialog';
import LinkWithIcon from '@common/LinkWithIcon';
import EditSavedSearchModal from './EditSavedSearchModal';

interface Props {
	id?: number;
	title?: string;
	searchTerms: SearchFilterSetRaw;
	showControls?: boolean;
	showSaveButton?: boolean;
	[prop: string]: any;
}

export default function SavedSearchItem({
	id,
	title,
	searchTerms,
	showControls = true,
	showSaveButton = false,
	...props
}: Props) {
	const { loggedInId } = useViewer();
	// const [saveSearchFieldText, setSaveSearchFieldText] = useState<string>(title ? title : '');
	const [_ignored, { data: { filteredCandidates } = [] }] = useCandidateSearch();
	const {
		search: { results },
		searchDispatch,
	} = useContext(SearchContext);

	const hasName = title && title !== '';

	const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
	const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
	// const initialSaveModalRef = useRef(null);

	// const { saveSearchMutation } = useSaveSearch();
	const { deleteOwnSavedSearchMutation } = useDeleteOwnSavedSearch();

	const toast = useToast();

	// Update SearchContext with the new results whenever the query returns.
	useEffect(() => {
		if (isEqual(filteredCandidates, results) || !filteredCandidates) return;

		searchDispatch({
			type: 'SET_RESULTS',
			payload: {
				results: filteredCandidates,
			},
		});
	}, [filteredCandidates]);

	// Get all the term IDs from the params object.
	const termIds = extractSearchTermIds(searchTerms);
	const [terms] = useTaxonomyTerms(termIds);

	const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const filterSet = prepareSearchFilterSet(searchTerms, terms);

		searchDispatch({
			type: 'RESTORE_SAVED_SEARCH',
			payload: {
				filterSet,
				savedSearchId: id,
			},
		});
	};

	const handleEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		editOnOpen();
	};

	// const handleEditOnClose = () => {
	// 	setSaveSearchFieldText(title ? title : '');
	// 	editOnClose();
	// };

	// const handleSave = (e: FormEvent) => {
	// 	e.preventDefault();

	// 	saveSearchMutation({
	// 		userId: loggedInId,
	// 		title: saveSearchFieldText,
	// 		filterSet: searchTerms,
	// 		id,
	// 	}).then(() => {
	// 		toast({
	// 			title: 'Saved!',
	// 			description:
	// 				'All of your saved searches are available in the Search Drawer and in the main menu.',
	// 			position: 'bottom',
	// 			status: 'success',
	// 			duration: 3000,
	// 			isClosable: true,
	// 		});

	// 		setSaveSearchFieldText('');
	// 		editOnClose();
	// 	});
	// };

	// const handleSavedSearchNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setSaveSearchFieldText(event.target.value);
	// };

	const handleDelete = () => {
		if (!id) return;

		deleteOwnSavedSearchMutation(id.toString(), loggedInId).then(() => {
			deleteOnClose();

			toast({
				title: 'Deleted!',
				description: 'This saved search has been deleted.',
				position: 'bottom',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		});
	};

	return termIds && termIds.length > 0 ? (
		<>
			<Stack w='auto' alignItems='space-between' {...props}>
				<StackItem>
					<Flex>
						{hasName ? (
							<LinkWithIcon
								onClick={handleEditClick}
								icon={FiEdit2}
								fontSize='lg'
								my={0}
								mr={8}
								flex={1}
								iconSide='left'
								color='inherit'
								borderBottomWidth='2px'
								borderBottomStyle='dotted'
								textDecoration='none !important'
								_hover={{ borderBottom: '1px  dotted brand.blue' }}
								_light={{
									borderBottomColor: 'gray.300',
									_hover: { borderBottomColor: 'gray.400' },
								}}
								_dark={{ borderBottomColor: 'gray.600', _hover: { borderBottomColor: 'gray.400' } }}
								iconProps={{ boxSize: 4, mb: '2px', ml: 1, position: 'relative', top: '2px' }}
							>
								{title}
							</LinkWithIcon>
						) : (
							false
						)}
						{id && showControls ? (
							<ButtonGroup
								alignItems='center'
								justifyContent='space-between'
								flex='0 0 auto'
								size='sm'
								spacing={1}
							>
								<IconButton
									icon={<FiSearch />}
									colorScheme='green'
									aria-label='Reuse this search'
									title='Reuse this search'
									onClick={handleSearchClick}
								/>
								<IconButton
									icon={<FiDelete />}
									colorScheme='orange'
									aria-label='Delete this search'
									title='Delete'
									onClick={deleteOnOpen}
								/>
							</ButtonGroup>
						) : (
							<Spacer />
						)}
					</Flex>
				</StackItem>
				<StackItem>
					<Flex w='full' justifyContent='space-between'>
						<SearchParamTags termIds={termIds} termItems={terms} />
						{showSaveButton ? (
							<Button
								colorScheme='blue'
								leftIcon={<FiSave />}
								aria-label={!!id ? `Update` : `Save` + `search`}
								title={!!id ? `Update` : `Save` + `search`}
								onClick={handleEditClick}
								ml={2}
								size='sm'
							>
								{!!id ? 'Update' : 'Save'} search
							</Button>
						) : (
							false
						)}
					</Flex>
				</StackItem>
			</Stack>

			<EditSavedSearchModal
				id={id ? id : 0}
				title={title ? title : ''}
				isOpen={editIsOpen}
				onClose={editOnClose}
				searchTerms={searchTerms}
			/>

			{/* <Modal initialFocusRef={initialSaveModalRef} isOpen={editIsOpen} onClose={handleEditOnClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader pb={2}>{hasName ? 'Rename this search' : 'Save this search'}</ModalHeader>
					<ModalCloseButton />

					<ModalBody pb={6}>
						<Text fontSize='sm' mt={0}>
							Give this search a short, descriptive name to easily run it again.
						</Text>

						<form id='rename-search' onSubmit={handleSave}>
							<FormControl>
								<FormLabel aria-label='Name' visibility='hidden' position='absolute' left='9000px'>
									Name
								</FormLabel>
								<TextInput
									name='title'
									placeholder='My search'
									onChange={handleSavedSearchNameChange}
									value={saveSearchFieldText}
									ref={initialSaveModalRef}
								/>
							</FormControl>
							<Button
								colorScheme='blue'
								mr={3}
								type='submit'
								isDisabled={saveSearchFieldText === title}
							>
								Save
							</Button>
							<Button onClick={handleEditOnClose} colorScheme='red'>
								Cancel
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal> */}

			<ConfirmActionDialog
				confirmAction={handleDelete}
				isOpen={deleteIsOpen}
				onClose={deleteOnClose}
				headerText='Delete this search'
			>
				Are you sure you want to delete this saved search?
			</ConfirmActionDialog>
		</>
	) : null;
}
