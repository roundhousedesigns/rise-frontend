import { useContext, useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CandidateList from '../components/CandidateList';

import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const {
		search: { results },
	} = useContext(SearchContext);

	// Set the results string based on the number of results.
	const resultsString = useMemo(() => {
		if (results.length === 0) {
			return 'No results.';
		} else if (results.length === 1) {
			return '1 result.';
		} else if (results.length > 100) {
			return 'Over 100 results. Try refining your search.';
		} else {
			return `${results.length} results.`;
		}
	}, [results]);

	return (
		<Box>
			<Text fontSize='sm' pb={2}>
				{resultsString}
			</Text>
			<CandidateList userIds={results} />
		</Box>
	);
}
