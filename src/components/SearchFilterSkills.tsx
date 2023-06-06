import { useContext } from 'react';
import { Heading, Box, Alert, Spinner, CheckboxGroup } from '@chakra-ui/react';
import { WPItem } from '../lib/classes';
import { useRelatedSkills } from '../hooks/queries/useRelatedSkills';

import ErrorAlert from './common/ErrorAlert';
import CheckboxButton from './common/CheckboxButton';
import { SearchContext } from '../context/SearchContext';

export default function SearchFilterSkills() {
	const { search, searchDispatch } = useContext(SearchContext);
	const [data, { loading, error }] = useRelatedSkills(search.filters.positions.jobs);

	const handleToggleTerm = (terms: string[]) => {
		searchDispatch({
			type: 'SET_SKILLS',
			payload: {
				skills: terms,
			},
		});
	};

	return data?.length > 0 && !loading && !error ? (
		<Box mt={8}>
			<Heading as='h3' variant='searchFilterTitle'>
				What skills are you looking for?
			</Heading>
			<CheckboxGroup defaultValue={search.filters.skills} onChange={handleToggleTerm}>
				{data.map((term: WPItem) => (
					<CheckboxButton key={term.id} value={term.id.toString()}>
						{term.name}
					</CheckboxButton>
				))}
			</CheckboxGroup>
		</Box>
	) : loading ? (
		<Spinner />
	) : error ? (
		<ErrorAlert message={error.message} />
	) : (
		// TODO implement "All Skills" button, which will append remaining Skills (excluding those already present) to the list.
		// Same as "More Skills", but without "exclude" parameter.
		<Alert status='info'>No job-specific skills found.</Alert>
	);
}
