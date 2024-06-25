import { FormEvent, useContext } from 'react';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Fade,
	Flex,
	Spacer,
	Stack,
	StackItem,
	Text,
} from '@chakra-ui/react';
import { FiArrowDown } from 'react-icons/fi';
import useSavedSearches from '@hooks/queries/useSavedSearches';
import { SearchContext } from '@context/SearchContext';
import SearchFilterDepartment from '@components/SearchFilterDepartment';
import SearchFilterJobs from '@components/SearchFilterJobs';
import SearchFilterSkills from '@components/SearchFilterSkills';
import SearchFilterName from '@components/SearchFilterName';
import AdditionalSearchFilters from '@components/AdditionalSearchFilters';
import SavedSearchItemList from '@components/SavedSearchItemList';
import SearchFilterDates from '@components/SearchFilterDates';
import DepartmentsAutocomplete from '@components/DepartmentsAutocomplete';

interface Props {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SearchWizardView({ onSubmit }: Props) {
	const {
		search: {
			searchActive,
			filters: {
				name,
				filterSet: {
					positions: { departments = [], jobs = [] },
				},
			},
		},
		searchDispatch,
	} = useContext(SearchContext);

	const [savedSearches] = useSavedSearches();

	const handleManualSearch = () => {
		searchDispatch({
			type: 'SET_SEARCH_ACTIVE',
			payload: {
				searchActive: true,
			},
		});
	};

	return (
		<Stack direction='column' justifyContent='space-between' height='full'>
			<Accordion
				allowToggle
				mb={4}
				defaultIndex={savedSearches && savedSearches.length > 0 ? 0 : undefined}
			>
				<AccordionItem>
					<h3>
						<AccordionButton fontSize='md' fontWeight='normal' pl={0} pt={2}>
							<Text as='span' m={0}>
								Your Saved Searches
							</Text>
							<AccordionIcon />
						</AccordionButton>
					</h3>
					<AccordionPanel px={0}>
						<SavedSearchItemList />
					</AccordionPanel>
				</AccordionItem>
			</Accordion>

			<Fade in={!name}>
				<form id='search-candidates' onSubmit={onSubmit}>
					<Stack mb={4} gap={6} height={name ? 0 : 'auto'}>
						<StackItem>
							<DepartmentsAutocomplete />
						</StackItem>
						<StackItem>
							<Flex m={0} p={0} gap={2} alignItems='center' fontSize='sm'>
								<Text>Or, you can</Text>
								<Button
									onClick={handleManualSearch}
									variant='searchFilter'
									m={0}
									leftIcon={<FiArrowDown />}
									isDisabled={searchActive}
									size='sm'
								>
									Browse
								</Button>{' '}
								to manually choose your search criteria.
							</Flex>
						</StackItem>

						<StackItem as={Fade} in={searchActive} unmountOnExit>
							<Stack gap={8}>
								<SearchFilterDepartment />
								<Fade in={!!departments.length} unmountOnExit>
									<SearchFilterJobs />
								</Fade>
								<Fade in={!!departments.length && !!jobs.length} unmountOnExit>
									<Flex alignItems='flex-start' gap={8} flexWrap='wrap'>
										<Box flex='1 0 50%'>
											<SearchFilterSkills />
										</Box>
										<Box flex='1 0 300px'>
											<SearchFilterDates />
										</Box>
									</Flex>
								</Fade>
								<Spacer h={8} />
								<Fade in={searchActive} unmountOnExit>
									<AdditionalSearchFilters />
								</Fade>
							</Stack>
						</StackItem>
					</Stack>
				</form>
			</Fade>

			<Spacer />
			{searchActive ? <Spacer /> : <SearchFilterName />}
		</Stack>
	);
}
