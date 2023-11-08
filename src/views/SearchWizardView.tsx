import { FormEvent, useContext } from 'react';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Fade,
	Text,
	Spacer,
	Stack,
} from '@chakra-ui/react';
import { SearchContext } from '@context/SearchContext';
import useSavedSearches from '@/hooks/queries/useSavedSearches';
import SearchFilterDepartment from '@components/SearchFilterDepartment';
import SearchFilterJobs from '@components/SearchFilterJobs';
import SearchFilterSkills from '@components/SearchFilterSkills';
import SearchFilterName from '@components/SearchFilterName';
import AdditionalSearchFilters from '@components/AdditionalSearchFilters';
import SavedSearchItems from '@/components/SavedSearchItems';

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
			{savedSearches && savedSearches.length > 0 ? (
				<Accordion allowToggle mb={4}>
					<AccordionItem>
						<h3>
							<AccordionButton fontWeight='normal'>
								<Box as='span'>Saved Searches</Box>
								<AccordionIcon />
							</AccordionButton>
						</h3>
						<AccordionPanel px={0}>
							<SavedSearchItems />
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			) : (
				false
			)}

			<Fade in={!name}>
				<form id='search-candidates' onSubmit={onSubmit}>
					<Box my={4} height={name ? 0 : 'auto'}>
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
