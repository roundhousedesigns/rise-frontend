import { FormEvent, useContext } from 'react';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Fade,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/react';
import { SearchContext } from '@context/SearchContext';
import useSavedSearches from '@hooks/queries/useSavedSearches';
import SearchFilterDepartment from '@components/SearchFilterDepartment';
import SearchFilterJobs from '@components/SearchFilterJobs';
import SearchFilterSkills from '@components/SearchFilterSkills';
import SearchFilterName from '@components/SearchFilterName';
import AdditionalSearchFilters from '@components/AdditionalSearchFilters';
import SavedSearchItemList from '@components/SavedSearchItemList';
import SearchFilterDates from '@/components/SearchFilterDates';

interface Props {
	showButtons?: boolean;
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
			>
				<AccordionItem bg='blackAlpha.50'>
					<h3>
						<AccordionButton fontSize='md' fontWeight='normal' pt={2}>
							<Text as='span' m={0}>
								Saved Searches
							</Text>
							<AccordionIcon />
						</AccordionButton>
					</h3>
					<AccordionPanel p={4}>
						<SavedSearchItemList />
					</AccordionPanel>
				</AccordionItem>
			</Accordion>

			<Fade in={!name}>
				<form id='search-candidates' onSubmit={onSubmit}>
					<Box mb={4} height={name ? 0 : 'auto'}>
						<SearchFilterDepartment />
						{departments.length ? <SearchFilterJobs /> : null}
						{departments.length && jobs.length > 0 ? (
							<>
								<SearchFilterSkills />
								<SearchFilterDates />
							</>
						) : null}
						<Spacer h={8} />
						<AdditionalSearchFilters />
					</Box>
				</form>
			</Fade>

			<Spacer />
			{searchActive ? <Spacer /> : <SearchFilterName />}
		</Stack>
	);
}
