import { useState, useContext, useEffect, useRef, FormEvent } from 'react';
import {
	IconButton,
	Modal,
	Button,
	FormControl,
	FormLabel,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
	Text,
	Stack,
	Wrap,
	Spacer,
	StackItem,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiEdit3, FiSearch, FiSave, FiDelete } from 'react-icons/fi';
import { extractSearchTermIds, prepareSearchFilterSet } from '@lib/utils';
import { SearchFilterSetRaw } from '@lib/types';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useCandidateSearch from '@hooks/queries/useCandidateSearch';
import useTaxonomyTerms from '@hooks/queries/useTaxonomyTerms';
import useViewer from '@hooks/queries/useViewer';
import TextInput from '@components/common/inputs/TextInput';
import SearchParamTags from '@common/SearchParamTags';
import useSaveSearch from '@hooks/mutations/useSaveSearch';
import useDeleteSavedSearch from '@/hooks/mutations/useDeleteSavedSearch';
import ConfirmActionDialog from './ConfirmActionDialog';

interface Props {
	id?: number;
	title?: string;
	searchTerms: SearchFilterSetRaw;
}

export default function SavedSearchItem({ id, title, searchTerms }: Props) {
	const { loggedInId } = useViewer();
	const [saveSearchFieldText, setSaveSearchFieldText] = useState<string>(title ? title : '');
	const [_ignored, { data: { filteredCandidates } = [] }] = useCandidateSearch();
	const {
		search: { results },
		searchDispatch,
	} = useContext(SearchContext);

	const { openDrawer } = useContext(SearchDrawerContext);

	const isNamed = title && title !== '';

	const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
	const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
	const initialSaveModalRef = useRef(null);

	const { saveSearchMutation } = useSaveSearch();
	const { deleteSavedSearchMutation } = useDeleteSavedSearch();

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
			type: 'RESTORE_FILTER_SET',
			payload: {
				filterSet,
			},
		});

		openDrawer();
	};

	const handleEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		editOnOpen();
	};

	const handleRenameSubmit = (e: FormEvent) => {
		e.preventDefault();

		saveSearchMutation({
			userId: loggedInId,
			title: saveSearchFieldText,
			filterSet: searchTerms,
			id,
		}).then(() => {
			toast({
				title: 'Saved!',
				position: 'top',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});

			editOnClose();
		});
	};

	const handleSavedSearchNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSaveSearchFieldText(event.target.value);
	};

	const handleDelete = () => {
		if (!id) return;

		deleteSavedSearchMutation(id.toString(), loggedInId).then(() => {
			deleteOnClose();

			toast({
				title: 'Deleted!',
				position: 'top',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		});
	};

	return termIds && termIds.length > 0 ? (
		<>
			<Stack>
				<StackItem display='flex' alignItems='center' gap={2}>
					<Text my={0} fontSize='lg'>
						{title}
					</Text>
					{isNamed ? (
						<IconButton
							icon={<FiEdit3 />}
							aria-label='Rename this search'
							title='Rename'
							size='sm'
							onClick={handleEditClick}
						>
							Rename
						</IconButton>
					) : (
						false
					)}
					<Spacer />
					<StackItem as={Wrap} alignItems='center'>
						{id ? (
							<IconButton
								icon={<FiSearch />}
								aria-label='Rerun this search'
								title='Rerun'
								size='sm'
								onClick={handleSearchClick}
							>
								Rerun
							</IconButton>
						) : (
							false
						)}
						{id ? (
							<IconButton
								icon={<FiDelete />}
								aria-label='Delete this search'
								title='Delete'
								size='sm'
								onClick={deleteOnOpen}
							>
								Delete
							</IconButton>
						) : (
							false
						)}
					</StackItem>
				</StackItem>
				<StackItem display='flex'>
					{!isNamed ? (
						<Button
							colorScheme='blue'
							leftIcon={<FiSave />}
							aria-label='Save this search'
							title='Save'
							onClick={handleEditClick}
							mr={1}
							size='sm'
						>
							Save
						</Button>
					) : (
						false
					)}
					<SearchParamTags termIds={termIds} termItems={terms} />
				</StackItem>
			</Stack>

			<Modal initialFocusRef={initialSaveModalRef} isOpen={editIsOpen} onClose={editOnClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{isNamed ? 'Rename this search' : 'Save this search'}</ModalHeader>
					<ModalCloseButton />

					<ModalBody pb={6}>
						<Text>
							Give this set of parameters a descriptive name to easily re-run this search.
						</Text>

						<form id='rename-search' onSubmit={handleRenameSubmit}>
							<FormControl>
								<FormLabel>Name</FormLabel>
								<TextInput
									name='title'
									placeholder='My search'
									onChange={handleSavedSearchNameChange}
									value={saveSearchFieldText}
									ref={initialSaveModalRef}
								/>
							</FormControl>
							<Button colorScheme='blue' mr={3} type='submit'>
								Save
							</Button>
							<Button onClick={editOnClose}>Cancel</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>

			<ConfirmActionDialog
				confirmAction={handleDelete}
				isOpen={deleteIsOpen}
				onClose={deleteOnClose}
				headerText='Delete this search'
			>
				Are you sure you want to delete this saved search?
			</ConfirmActionDialog>
		</>
	) : (
		false
	);
}
