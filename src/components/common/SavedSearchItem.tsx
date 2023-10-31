import { useState, useContext, useEffect, useRef } from 'react';
import {
	Flex,
	IconButton,
	Modal,
	Button,
	FormControl,
	FormLabel,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
	Text,
	ButtonGroup,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiEdit3, FiSearch, FiSave, FiDelete, FiInfo } from 'react-icons/fi';
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

interface Props {
	searchTerms: SearchFilterSetRaw;
	deleteButton?: boolean;
	rerunButton?: boolean;
}

export default function SavedSearchItem({ searchTerms, deleteButton, rerunButton }: Props) {
	const { loggedInId } = useViewer();
	const [saveSearchFieldText, setSaveSearchFieldText] = useState<string>(
		searchTerms.searchName ? searchTerms.searchName : ''
	);
	const [, { data: { filteredCandidates } = [] }] = useCandidateSearch();
	const {
		search: { results },
		searchDispatch,
	} = useContext(SearchContext);

	const { openDrawer } = useContext(SearchDrawerContext);

	const isNamed = searchTerms.searchName && searchTerms.searchName !== '';

	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialSaveModalRef = useRef(null);

	const { saveSearchFiltersMutation } = useSaveSearch();

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
		onOpen();
	};

	const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// Omit the searchName property from the searchTerms object.
		const { searchName, ...filterSet } = searchTerms;

		saveSearchFiltersMutation({
			searchUserId: loggedInId,
			oldSearchName: searchTerms.searchName ? searchTerms.searchName : undefined,
			searchName: saveSearchFieldText,
			filterSet,
		}).then(() => {
			toast({
				title: 'Saved!',
				position: 'top',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});

			onClose();
		});
	};

	const handleSavedSearchNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSaveSearchFieldText(event.target.value);
	};

	const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		console.log('delete');
	};

	return termIds && termIds.length > 0 ? (
		<>
			<Flex gap={0} alignItems='center'>
				<Text>{searchTerms.searchName} </Text>
				<Popover placement='bottom'>
					<PopoverTrigger>
						<IconButton
							m={0}
							p={0}
							aria-label='Saved search parameters'
							icon={<FiInfo />}
							variant='invisible'
							title='Saved search parameters'
						/>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverBody>
							<SearchParamTags termIds={termIds} termItems={terms} />
						</PopoverBody>
					</PopoverContent>
				</Popover>
				<ButtonGroup size='xs' isAttached variant='outline'>
					{isNamed ? (
						<Button
							leftIcon={<FiEdit3 />}
							aria-label='Rename this search'
							title='Rename'
							onClick={handleEditClick}
						>
							Rename
						</Button>
					) : (
						<Button
							colorScheme='green'
							leftIcon={<FiSave />}
							aria-label='Save this search'
							onClick={handleEditClick}
							mr={1}
						>
							Save
						</Button>
					)}
					{rerunButton ? (
						<Button
							leftIcon={<FiSearch />}
							aria-label='Rerun this search'
							title='Rerun'
							onClick={handleSearchClick}
						>
							Rerun
						</Button>
					) : (
						false
					)}
					{deleteButton ? (
						<Button
							leftIcon={<FiDelete />}
							aria-label='Delete this search'
							title='Delete'
							onClick={handleDelete}
						>
							Delete
						</Button>
					) : (
						false
					)}
				</ButtonGroup>
			</Flex>

			<Modal initialFocusRef={initialSaveModalRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{isNamed ? 'Rename this search' : 'Save this search'}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Text>
							Give this set of parameters a descriptive name to easily re-run this search.
						</Text>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<TextInput
								name='searchName'
								placeholder='My search'
								onChange={handleSavedSearchNameChange}
								value={saveSearchFieldText}
								ref={initialSaveModalRef}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleSaveClick}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	) : (
		false
	);
}
