import { FormEvent, useContext } from 'react';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Fade,
	Flex,
	Spacer,
	Stack,
	StackItem,
	Text,
} from '@chakra-ui/react';
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
	} = useContext(SearchContext);

	const [savedSearches] = useSavedSearches();

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
							<Box maxW='lg'>
								<DepartmentsAutocomplete />
							</Box>
						</StackItem>
						<StackItem>
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
								<Fade in={searchActive && jobs && !!jobs.length} unmountOnExit>
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
