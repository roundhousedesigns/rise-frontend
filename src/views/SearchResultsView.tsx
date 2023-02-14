import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CandidateList from '../components/common/CandidateList';

import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const {
		search: { results },
	} = useContext(SearchContext);

	return results.length > 0 ? (
		<Box>
			<Text fontSize='sm' pb={2}>
				Showing X of Y search results.
			</Text>
			<CandidateList userIds={results} />
		</Box>
	) : (
		<p>No results.</p>
	);
}
