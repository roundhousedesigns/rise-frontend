import { useContext, useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CandidateList from '../components/CandidateList';

import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const {
		search: { results, searchActive },
	} = useContext(SearchContext);

	const [resultsString, setResultsString] = useState<string>('No results.');

	// Set the results string based on the number of results.
	useEffect(() => {
		setResultsString(
			results.length === 0
				? 'No results.'
				: results.length === 1
				? '1 result.'
				: `${results.length} results.`
		);
	}, [results, searchActive]);

	return (
		<Box>
			<Text fontSize='sm' pb={2}>
				{resultsString}
			</Text>
			<CandidateList userIds={results} />
		</Box>
	);
}
