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
} from '@chakra-ui/react';
import { SearchContext } from '@context/SearchContext';
import useSavedSearches from '@hooks/queries/useSavedSearches';
import SearchFilterDepartment from '@components/SearchFilterDepartment';
import SearchFilterJobs from '@components/SearchFilterJobs';
import SearchFilterSkills from '@components/SearchFilterSkills';
import SearchFilterName from '@components/SearchFilterName';
import AdditionalSearchFilters from '@components/AdditionalSearchFilters';
import SavedSearchItemList from '@components/SavedSearchItemList';

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
				defaultIndex={savedSearches && savedSearches.length > 0 ? 0 : undefined}
			>
				<AccordionItem>
					<h3>
						<AccordionButton fontSize='md' fontWeight='normal' pl={0} pb={0}>
							<Box as='span'>Your Saved Searches</Box>
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
					<Box mb={4} height={name ? 0 : 'auto'}>
						<SearchFilterDepartment />
						{departments.length ? <SearchFilterJobs /> : null}
						{departments.length && jobs.length > 0 ? <SearchFilterSkills /> : null}
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
