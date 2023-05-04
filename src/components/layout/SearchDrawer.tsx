import { useContext, useEffect } from 'react';
import { isEqual } from 'lodash';
import { useNavigate } from 'react-router-dom';
import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Stack,
	Heading,
	IconButton,
	Button,
	ButtonGroup,
} from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';

import SearchWizardView from '../../views/SearchWizardView';
import { useCandidateSearch } from '../../hooks/queries/useCandidateSearch';

import { SearchContext } from '../../context/SearchContext';
import AdvancedSearchFilters from '../AdvancedSearchFilters';
import { useViewer } from '../../hooks/queries/useViewer';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default function SearchDrawer({ isOpen, onClose }: Props) {
	const { loggedInId } = useViewer();

	const {
		search: {
			filters: {
				positions: { jobs, department },
				skills,
				unions,
				locations,
				experienceLevels,
				genderIdentities,
				racialIdentities,
				personalIdentities,
			},
			searchActive,
			results,
		},
		searchDispatch,
	} = useContext(SearchContext);
	const [getSearchResults, { data }] = useCandidateSearch();
	const navigate = useNavigate();

	// Update SearchContext with the new results whenever the query returns.
	useEffect(() => {
		if (isEqual(data?.filteredCandidates, results)) return;

		searchDispatch({
			type: 'SET_RESULTS',
			payload: {
				results: data?.filteredCandidates,
			},
		});
	}, [data?.filteredCandidates]);

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// set the positions array to the jobs array if it's not empty, otherwise use the department array
		const positions = jobs.length > 0 ? jobs : department;

		getSearchResults({
			variables: {
				positions,
				skills: skills && skills.length > 0 ? skills : [],
				unions: unions && unions.length > 0 ? unions : [],
				locations: locations && locations.length > 0 ? locations : [],
				experienceLevels: experienceLevels && experienceLevels.length > 0 ? experienceLevels : [],
				genderIdentities: genderIdentities && genderIdentities.length > 0 ? genderIdentities : [],
				racialIdentities: racialIdentities && racialIdentities.length > 0 ? racialIdentities : [],
				personalIdentities:
					personalIdentities && personalIdentities.length > 0 ? personalIdentities : [],
				exclude: loggedInId,
			},
			fetchPolicy: 'network-only',
		});

		navigate('/results');
		onClose();
	};

	const handleSearchReset = () => {
		searchDispatch({
			type: 'RESET_SEARCH_FILTERS',
			payload: {},
		});
	};

	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement='top' size='full'>
			<DrawerOverlay bg='blackAlpha.200' />
			<DrawerContent>
				<DrawerHeader
					fontSize='2xl'
					py={6}
					bg='text.dark'
					color='whiteAlpha.900'
					borderBottom='2px solid green'
				>
					<Stack direction='row' justifyContent='space-between' alignItems='center'>
						<Heading size='lg' color='text.light'>
							Search
						</Heading>
						<IconButton
							icon={<FiX />}
							aria-label='Close'
							fontSize='5xl'
							onClick={onClose}
							variant='invisible'
						/>
					</Stack>
				</DrawerHeader>
				<DrawerBody py={8}>
					<SearchWizardView showButtons={false} onSubmit={handleSubmit} />
					<AdvancedSearchFilters mt={10} />
				</DrawerBody>
				<DrawerFooter mt={0} borderTop='1px' borderTopColor='gray.300'>
					<ButtonGroup>
						<Button
							colorScheme='green'
							onClick={handleSubmit}
							size='md'
							form='search-candidates'
							isDisabled={!searchActive}
						>
							Search
						</Button>
						{searchActive ? (
							<Button colorScheme='gray' onClick={handleSearchReset} size='md'>
								Reset Filters
							</Button>
						) : (
							false
						)}
					</ButtonGroup>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
