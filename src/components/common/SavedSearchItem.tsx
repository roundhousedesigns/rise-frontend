import { useState, useContext, useEffect, useRef, MouseEventHandler } from 'react';
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
	Spacer,
	Text,
	Link,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiEdit3, FiSearch, FiSave, FiDelete } from 'react-icons/fi';
import { extractSearchTermIds, prepareSearchFilterSet } from '../../lib/utils';
import { SearchContext } from '../../context/SearchContext';
import SearchDrawerContext from '../../context/SearchDrawerContext';
import useCandidateSearch from '../../hooks/queries/useCandidateSearch';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';
import useViewer from '../../hooks/queries/useViewer';
import TextInput from './inputs/TextInput';
import SearchParamTags from './SearchParamTags';
import { SearchFilterSetRaw } from '../../lib/types';
import useSaveSearch from '../../hooks/mutations/useSaveSearch';

interface Props {
	searchTerms: SearchFilterSetRaw;
	withDelete?: boolean;
}

export default function SavedSearchItem({ searchTerms, withDelete = true }: Props) {
	const { loggedInId } = useViewer();
	const [saveSearchFieldText, setSaveSearchFieldText] = useState<string>(
		searchTerms.searchName ? searchTerms.searchName : ''
	);
	const [, { data: { filteredCandidates } = [] }] = useCandidateSearch();
	const {
		search: { filters, results },
		searchDispatch,
	} = useContext(SearchContext);

	const { openDrawer } = useContext(SearchDrawerContext);

	const isNamedSearch = searchTerms.searchName && searchTerms.searchName !== '';

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

	const handleSearchClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		const filterSet = prepareSearchFilterSet(searchTerms, terms);

		searchDispatch({
			type: 'RESTORE_FILTER_SET',
			payload: {
				filterSet,
			},
		});

		openDrawer();
	};

	const handleSaveSearchClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

	const handleSaveSearchNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSaveSearchFieldText(event.target.value);
	};

	const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		console.log('delete');
	};

	return (
		<>
			<Flex alignItems='center' justifyContent='flex-start' flexWrap='wrap'>
				{isNamedSearch ? (
					<>
						<Text>{searchTerms.searchName}</Text>
						{withDelete ? (
							<>
								<Spacer />
								<IconButton
									icon={<FiDelete />}
									onClick={handleDelete}
									colorScheme='red'
									aria-label={`Delete this search`}
									title={`Delete`}
									size='sm'
									mr={2}
								/>
							</>
						) : (
							false
						)}
						<Link onClick={handleSearchClick} mr={2} flex='0 0 100%'>
							<SearchParamTags termIds={termIds} allTerms={terms} />
						</Link>
					</>
				) : (
					<Link onClick={handleSearchClick} mr={2} flex='1'>
						<SearchParamTags termIds={termIds} allTerms={terms} />
					</Link>
				)}
			</Flex>

			<Modal initialFocusRef={initialSaveModalRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{isNamedSearch ? 'Rename this search' : 'Save this search'}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<TextInput
								name='searchName'
								placeholder='My search'
								onChange={handleSaveSearchNameChange}
								value={saveSearchFieldText}
								ref={initialSaveModalRef}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleSaveSearchClick}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
