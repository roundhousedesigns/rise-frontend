import { FormEvent, useContext } from 'react';
import { Accordion, Box, Fade, Heading, Spacer, Stack, StackItem } from '@chakra-ui/react';
import { SearchContext } from '@context/SearchContext';
import SearchFilterAccordionItem from '@common/SearchFilterAccordionItem';
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
			savedSearch: { id: savedSearchId },
		},
	} = useContext(SearchContext);

	return (
		<Stack direction='column' justifyContent='space-between' height='full'>
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
								<StackItem>
									<SearchFilterSection id='filterDepartment'>
										<SearchFilterDepartment />
									</SearchFilterSection>
								</StackItem>
								<Fade in={!!departments.length} unmountOnExit>
									<SearchFilterSection
										id='filterJobs'
										heading='What job(s) are you looking to fill?'
									>
										<SearchFilterJobs />
									</SearchFilterSection>
								</Fade>
								<Fade in={!!departments.length && !!jobs.length} unmountOnExit>
									<SearchFilterSection id='filterSkills' heading='What skills are you looking for?'>
										<SearchFilterSkills />
									</SearchFilterSection>
								</Fade>
								<Fade in={!!departments.length && !!jobs.length} unmountOnExit>
									<SearchFilterSection
										id='filterDates'
										heading='Are you hiring for a particular date?'
									>
										<SearchFilterDates />
									</SearchFilterSection>
								</Fade>
								<Fade in={searchActive && jobs && !!jobs.length} unmountOnExit>
									<SearchFilterSection
										id='filterAdditional'
										heading='And some additional filters to refine your search:'
									>
										<AdditionalSearchFilters />
									</SearchFilterSection>
								</Fade>
							</Stack>
						</StackItem>
					</Stack>
				</form>
			</Fade>

			<Spacer />

			<Accordion allowToggle mb={4}>
				<SearchFilterAccordionItem
					heading='Saved Searches'
					bg='blackAlpha.50'
					headingProps={{ fontSize: 'md' }}
				>
					<SavedSearchItemList px={4} />
				</SearchFilterAccordionItem>
				<SearchFilterAccordionItem
					heading='Search by Name'
					bg='blackAlpha.50'
					headingProps={{ fontSize: 'md' }}
				>
					<SearchFilterName px={4} />
				</SearchFilterAccordionItem>
			</Accordion>
		</Stack>
	);
}

const SearchFilterSection = ({
	id,
	heading,
	children,
	...props
}: {
	id: string;
	heading?: string;
	children: JSX.Element;
	[prop: string]: any;
}) => (
	<Box id={id} {...props}>
		{heading ? (
			<Heading as='h3' variant='searchFilterTitle'>
				{heading}
			</Heading>
		) : (
			false
		)}
		{children}
	</Box>
);
