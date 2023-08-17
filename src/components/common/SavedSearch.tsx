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
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiRefreshCw, FiSave } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { extractSearchTermIds, prepareSearchFilterSet } from '../../lib/utils';
import { SearchContext } from '../../context/SearchContext';
import useCandidateSearch from '../../hooks/queries/useCandidateSearch';
import useTaxonomyTerms from '../../hooks/queries/useTaxonomyTerms';
import useViewer from '../../hooks/queries/useViewer';
import TextInput from './inputs/TextInput';
import ReadableSearchString from './ReadableSearchString';
import { SearchFilterSetRaw } from '../../lib/types';
import useSaveSearch from '../../hooks/mutations/useSaveSearch';

interface Props {
	searchTerms: SearchFilterSetRaw;
}

export default function SavedSearch({ searchTerms }: Props) {
	const { loggedInId } = useViewer();
	const [saveSearchFieldText, setSaveSearchFieldText] = useState<string>('');
	const [getSearchResults, { data: { filteredCandidates } = [] }] = useCandidateSearch();
	const {
		search: { results },
		searchDispatch,
	} = useContext(SearchContext);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialSaveModalRef = useRef(null);

	const { saveSearchFiltersMutation } = useSaveSearch();

	const navigate = useNavigate();

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

		getSearchResults({
			variables: { ...searchTerms, searchUserId: loggedInId },
		})
			.then(() => {
				navigate('/results');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleSaveSearchClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		saveSearchFiltersMutation({
			searchUserId: loggedInId,
			searchName: saveSearchFieldText,
			filterSet: searchTerms,
		}).then(() => {
			alert('saved!');
			onClose();
		});
	};

	const handleSaveSearchNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSaveSearchFieldText(event.target.value);
	};

	return (
		<>
			<Flex alignItems='center' justifyContent='flex-start'>
				<IconButton
					icon={<FiRefreshCw />}
					onClick={handleSearchClick}
					aria-label={`Rerun this search`}
					size='sm'
					mr={2}
				/>
				<IconButton
					icon={<FiSave />}
					onClick={() => onOpen()}
					aria-label={`Save this search`}
					size='sm'
					mr={2}
				/>
				<ReadableSearchString termIds={termIds} allTerms={terms} />
			</Flex>

			<Modal initialFocusRef={initialSaveModalRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Save this Search</ModalHeader>
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
