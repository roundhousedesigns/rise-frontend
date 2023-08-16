import { useContext, useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CandidateList from '../components/CandidateList';

import { SearchContext } from '../context/SearchContext';
import ReadableSearchString from '../components/common/ReadableSearchString';

export default function SearchResultsView() {
	const {
		search: { results },
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
				{/* <ReadableSearchString  */}
			</Text>
			<CandidateList userIds={results} />
		</Box>
	);
}
