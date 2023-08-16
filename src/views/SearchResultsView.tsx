import { useContext, useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CandidateList from '../components/CandidateList';

import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const {
		search: {
			// filters: { filterSet },
			results,
		},
	} = useContext(SearchContext);

	// Set the results string based on the number of results.
	const resultsCountString = useMemo(() => {
		if (results.length === 0) {
			return 'No results.';
		} else if (results.length === 1) {
			return '1 result.';
		} else {
			return `${results.length} results.`;
		}
	}, [results]);

	return (
		<Box>
			<Text fontSize='sm' pb={2}>
				{resultsCountString}
				{/* TODO add results string here w/ param details */}
			</Text>
			<CandidateList userIds={results} />
		</Box>
	);
}
