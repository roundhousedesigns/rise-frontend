import { useContext, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';

import SearchWizardView from '../../views/SearchWizardView';
import { useCandidateSearch } from '../../hooks/queries/useCandidateSearch';

import { SearchContext } from '../../context/SearchContext';
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
				name,
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
		},
		searchDispatch,
	} = useContext(SearchContext);
	const navigate = useNavigate();

	const [getSearchResults, { data }] = useCandidateSearch();

	// Update SearchContext with the new results whenever the query returns.
	useEffect(() => {
		// if (isEqual(data?.filteredCandidates, results)) return;

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
				// first: 10,
				// after: null,
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
		<Drawer isOpen={isOpen} onClose={onClose} placement='top' size={name ? 'auto' : 'full'}>
			<DrawerOverlay _dark={{ bg: 'text.light' }} _light={{ bg: 'text.dark' }} />
			<DrawerContent>
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
						<Heading variant='contentTitle' mb={0} color='text.light'>
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
					<DrawerFooter mt={0} py={2} borderTop='1px' borderTopColor='gray.300'>
						<ButtonGroup>
							<Button
								colorScheme='green'
								onClick={handleSubmit}
								form='search-candidates'
								isDisabled={!searchActive}
							>
								Search
							</Button>
							{searchActive ? (
								<Button colorScheme='gray' onClick={handleSearchReset}>
									Reset Filters
								</Button>
							) : (
								false
							)}
						</ButtonGroup>
					</DrawerFooter>
				</Collapse>
			</DrawerContent>
		</Drawer>
	);
}
