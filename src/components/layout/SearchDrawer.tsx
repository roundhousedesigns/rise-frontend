import { FormEvent, useContext, useEffect } from 'react';
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
	Collapse,
	Spinner,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiRefreshCcw, FiSearch, FiX } from 'react-icons/fi';
import { SearchContext } from '@context/SearchContext';
import useViewer from '@hooks/queries/useViewer';
import useCandidateSearch from '@hooks/queries/useCandidateSearch';
import SearchWizardView from '@views/SearchWizardView';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default function SearchDrawer({ isOpen, onClose }: Props) {
	const { loggedInId } = useViewer();

	const {
		search: {
			filters: {
				name,
				filterSet: {
					positions: { jobs, departments },
					skills,
					unions,
					locations,
					experienceLevels,
					genderIdentities,
					racialIdentities,
					personalIdentities,
				},
			},
			results,
			searchActive,
			triggerSearch,
		},
		searchDispatch,
	} = useContext(SearchContext);

	const navigate = useNavigate();

	const [getSearchResults, { data: { filteredCandidates } = [], loading: searchResultsLoading }] =
		useCandidateSearch();

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

	// Trigger a search if a saved filter set is restored.
	useEffect(() => {
		if (!triggerSearch) {
			return;
		}

		runSearch();
	}, [triggerSearch]);

	const runSearch = () => {
		// set the positions array to the jobs array if it's not empty, otherwise use the departments array
		const positions = jobs && jobs.length > 0 ? jobs : departments;

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
				searchUserId: loggedInId,
			},
		})
			.then(() => {
				onClose();
				navigate('/results');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// Handle form submission
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		runSearch();
	};

	const handleSearchReset = () => {
		searchDispatch({
			type: 'RESET_SEARCH_FILTERS',
			payload: {},
		});
	};

	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement='top' isFullHeight={name ? false : true}>
			<DrawerOverlay />
			<DrawerContent display='flex' flexDirection='column' height='100%'>
				<DrawerHeader
					bg='text.dark'
					color='text.light'
					borderBottomWidth='2px'
					_light={{
						borderBottomColor: 'text.dark',
					}}
					_dark={{
						borderBottomColor: 'text.light',
					}}
				>
					<Stack direction='row' justifyContent='space-between' alignItems='center'>
						<Heading as='h2' variant='contentTitle' mb={0} color='text.light'>
							Search
						</Heading>
						<IconButton
							icon={<FiX />}
							aria-label='Close'
							fontSize='3xl'
							onClick={onClose}
							variant='invisible'
						/>
					</Stack>
				</DrawerHeader>
				<DrawerBody py={8}>
					<SearchWizardView showButtons={false} onSubmit={handleSubmit} />
				</DrawerBody>
				<Collapse in={searchActive && !name} unmountOnExit={false}>
					<DrawerFooter
						mt={0}
						py={2}
						borderTop='1px'
						borderTopColor='gray.300'
						_light={{ bgColor: 'gray.300' }}
						_dark={{ bgColor: 'gray.100' }}
					>
						<ButtonGroup>
							<Button
								colorScheme='green'
								onClick={handleSubmit}
								form='search-candidates'
								isDisabled={!searchActive || searchResultsLoading}
								leftIcon={searchResultsLoading ? <Spinner /> : <FiSearch />}
								isLoading={!!searchResultsLoading}
							>
								Search
							</Button>
							<Button
								isDisabled={searchResultsLoading ? true : false}
								colorScheme='orange'
								onClick={handleSearchReset}
								leftIcon={<FiRefreshCcw />}
							>
								Reset
							</Button>
						</ButtonGroup>
					</DrawerFooter>
				</Collapse>
			</DrawerContent>
		</Drawer>
	);
}
