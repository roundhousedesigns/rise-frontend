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
		} else if (results.length > 100) {
			return 'More than 100 results.';
		} else {
			return `${results.length} results.`;
		}
	}, [results]);

	const orderedResults = useMemo(() => {
		if (!results.length) return [];

		// Sort the results by score.
		const sortedResults = [...results].sort((a, b) => {
			return b.score - a.score;
		});

		// Return just the user IDs in the new order.
		return sortedResults.map((item) => Number(item.id));
	}, [results]);

	return (
		<Box>
			<Text fontSize='sm' pb={2}>
				{resultsCountString}
				{/* TODO add results string here w/ param details */}
			</Text>
			<CandidateList userIds={orderedResults} />
		</Box>
	);
}
