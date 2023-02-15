import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CandidateList from '../components/common/CandidateList';

import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const {
		search: { results },
	} = useContext(SearchContext);

	const resultsString =
		results.length === 0
			? 'No results.'
			: results.length === 1
			? '1 result.'
			: `${results.length} results.`;

	return results.length > 0 ? (
		<Box>
			<Text fontSize='sm' pb={2}>
				{resultsString}
			</Text>
			<CandidateList userIds={results} />
		</Box>
	) : (
		<p>No results.</p>
	);
}
