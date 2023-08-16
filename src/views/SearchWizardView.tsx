import { FormEvent, useContext } from 'react';
import { Box, Fade, Spacer } from '@chakra-ui/react';

import SearchFilterDepartment from '../components/SearchFilterDepartment';
import SearchFilterJobs from '../components/SearchFilterJobs';
import SearchFilterSkills from '../components/SearchFilterSkills';

import { SearchContext } from '../context/SearchContext';
import SearchFilterName from '../components/SearchFilterName';
import AdditionalSearchFilters from '../components/AdditionalSearchFilters';

interface Props {
	showButtons?: boolean;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SearchWizardView({ onSubmit }: Props) {
	const {
		search: {
			filters: {
				name,
				filterSet: {
					positions: { department, jobs },
				},
			},
		},
	} = useContext(SearchContext);

	return (
		<>
			<SearchFilterName />

			<Fade in={!name}>
				<form id='search-candidates' onSubmit={onSubmit}>
					<Box my={4} height={name ? 0 : 'auto'}>
						<SearchFilterDepartment />
						{department ? <SearchFilterJobs /> : null}
						{department && jobs && jobs.length > 0 ? <SearchFilterSkills /> : null}
						<Spacer h={8} />
						<AdditionalSearchFilters />
					</Box>
				</form>
			</Fade>
		</>
	);
}
