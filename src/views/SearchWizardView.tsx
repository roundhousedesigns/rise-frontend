import { FormEvent, useContext } from 'react';
import { Accordion, Box, Fade, Spacer, Stack, StackItem } from '@chakra-ui/react';
import { SearchContext } from '@context/SearchContext';
import SearchFilterDepartment from '@components/SearchFilterDepartment';
import SearchFilterJobs from '@components/SearchFilterJobs';
import SearchFilterSkills from '@components/SearchFilterSkills';
import SearchFilterName from '@components/SearchFilterName';
import AdditionalSearchFilters from '@components/AdditionalSearchFilters';
import SavedSearchItemList from '@components/SavedSearchItemList';
import SearchFilterDates from '@components/SearchFilterDates';
import DepartmentsAutocomplete from '@components/DepartmentsAutocomplete';
import SearchFilterAccordionItem from '@/components/common/SearchFilterAccordionItem';

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
			savedSearch: { id: savedSearchId },
		},
	} = useContext(SearchContext);

	return (
		<Stack direction='column' justifyContent='space-between' height='full'>
			<Accordion allowToggle mb={4}>
				<SearchFilterAccordionItem
					heading='Saved Searches'
					bg='blackAlpha.50'
					headingProps={{ fontSize: 'md' }}
				>
					<SavedSearchItemList />
				</SearchFilterAccordionItem>
				<SearchFilterAccordionItem
					heading='Search by Name'
					bg='blackAlpha.50'
					headingProps={{ fontSize: 'md' }}
				>
					<SearchFilterName />
				</SearchFilterAccordionItem>
			</Accordion>

			<Fade in={!name}>
				<form id='search-candidates' onSubmit={onSubmit}>
					<Stack mb={4} gap={6} height={name ? 0 : 'auto'}>
						<Fade in={!savedSearchId} unmountOnExit>
							<StackItem>
								<Box maxW='lg'>
									<DepartmentsAutocomplete />
								</Box>
							</StackItem>
						</Fade>
						<StackItem>
							<Stack gap={8}>
								<SearchFilterDepartment />
								<Fade in={!!departments.length} unmountOnExit>
									<SearchFilterJobs />
								</Fade>
								<Fade in={!!departments.length && !!jobs.length} unmountOnExit>
									<SearchFilterSkills />
								</Fade>
								<Fade in={!!departments.length && !!jobs.length} unmountOnExit>
									<SearchFilterDates />
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
		</Stack>
	);
}
