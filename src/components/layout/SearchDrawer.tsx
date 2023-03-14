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
	Accordion,
	Stack,
	Heading,
	IconButton,
	Button,
	Spacer,
	ButtonGroup,
} from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';

import SearchList from '../common/SearchList';
import WidgetAccordionItem from '../common/WidgetAccordionItem';
import SearchWizardView from '../../views/SearchWizardView';
import { useCandidateSearch } from '../../hooks/queries/useCandidateSearch';

import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';

// TODO: Remove this when we have real data
import { _devSavedSearches, _devRecentSearches } from '../../lib/_devData';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default function SearchDrawer({ isOpen, onClose }: Props) {
	const { loggedInUser } = useContext(AuthContext);
	const {
		search: {
			filters: {
				positions: { jobs },
				skills,
			},
			searchActive,
			results,
		},
		searchDispatch,
	} = useContext(SearchContext);
	const [getSearchResults, { data /* loading, error, */ }] = useCandidateSearch();
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

		getSearchResults({
			variables: {
				jobs: jobs && jobs.length > 0 ? jobs : [],
				skills: skills && skills.length > 0 ? skills : [],
				exclude: loggedInUser.id,
			},
		});

		navigate('/results');
		onClose();
	};

	const handleSearchReset = () => {
		searchDispatch({
			type: 'RESET_SEARCH_FILTERS',
		});
	};

	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement='top' size='full'>
			<DrawerOverlay bg='blackAlpha.200' />
			<DrawerContent>
				<DrawerHeader
					fontSize='2xl'
					py={6}
					bg='blackAlpha.800'
					color='whiteAlpha.900'
					borderBottom='2px solid pink'
				>
					<Stack direction='row' justifyContent='space-between' alignItems='center'>
						<Heading size='lg' color='text.light'>
							Search
						</Heading>
						<Spacer flex='0 0 1em' />
						{searchActive ? (
							<ButtonGroup>
								<Button
									colorScheme='blue'
									onClick={handleSubmit}
									size='md'
									form='search-candidates'
								>
									Search
								</Button>
								<Button colorScheme='whiteAlpha' onClick={handleSearchReset} size='md'>
									Reset Filters
								</Button>
							</ButtonGroup>
						) : null}
						<Spacer />
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
				</DrawerBody>
				<DrawerFooter mt={0}>
					<Accordion allowMultiple={true} w='full'>
						<WidgetAccordionItem heading='Saved Searches'>
							<SearchList items={_devSavedSearches} />
						</WidgetAccordionItem>
						<WidgetAccordionItem heading='Recent Searches'>
							<SearchList items={_devRecentSearches} />
						</WidgetAccordionItem>
					</Accordion>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
