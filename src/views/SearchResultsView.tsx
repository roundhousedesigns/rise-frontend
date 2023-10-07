import { useContext, useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CandidateList from '../components/CandidateList';

import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const {
		search: { results },
	} = useContext(SearchContext);

	const resultsCount = results.length;

	// Set the results string based on the number of results.
	const resultsString = useMemo(() => {
		if (resultsCount === 0) {
			return 'No results.';
		} else if (resultsCount === 1) {
			return '1 result.';
		} else if (resultsCount > 100) {
			return 'Over 100 results';
		} else {
			return `${resultsCount} results.`;
		}
	}, [results]);

	return (
		<Box>
			<Text fontSize='sm' pb={2}>
				{resultsString}
			</Text>
			<CandidateList userIds={results} />

			{resultsCount > 100 ? (
				<Text>Showing the first 100 results. Try refining your search!</Text>
			) : null}
		</Box>
	);
}
