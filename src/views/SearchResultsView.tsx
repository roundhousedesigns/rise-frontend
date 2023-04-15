import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CandidateList from '../components/common/CandidateList';

import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const {
		search: { results, searchActive },
	} = useContext(SearchContext);

	const resultsString =
		searchActive === false
			? 'Start a search to see results.'
			: results.length === 0
			? 'No results.'
			: results.length === 1
			? '1 result.'
			: `${results.length} results.`;

	return (
		<Box>
			<Text fontSize='sm' pb={2}>
				{resultsString}
			</Text>
			<Text color='brand.red' fontWeight='bold' fontSize='sm'>
				While search is under development, results accuracy is not guaranteed.
			</Text>
			{searchActive ? <CandidateList userIds={results} /> : null}
		</Box>
	);
}
