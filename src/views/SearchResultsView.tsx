import { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import CandidateList from '../components/common/CandidateList';

import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const {
		search: { results, searchActive },
	} = useContext(SearchContext);

	const [resultsString, setResultsString] = useState<string>('');
	// const [resultsList, setResultsList] = useState<number[]>([]);

	// TODO This WORKS, but determine if useMemo is the right call here.
	const resultsList = useMemo(() => results, [results]);

	// Update the results list whenever the results change.
	// useEffect(() => {
	// 	if (isEqual(results, resultsList)) return;

	// 	setResultsList(results);
	// }, [results]);

	// const [getSearchResults, { data }] = useCandidateSearch(handleSearchComplete);

	// Set the results string based on the number of results.
	useEffect(() => {
		setResultsString(
			resultsList.length === 0
				? 'No results.'
				: resultsList.length === 1
				? '1 result.'
				: `${resultsList.length} results.`
		);
	}, [resultsList, searchActive]);

	// const handleLoadMore = () => {
	// 	// set the positions array to the jobs array if it's not empty, otherwise use the department array
	// 	const positions = jobs.length > 0 ? jobs : department;

	// 	getSearchResults({
	// 		variables: {
	// 			positions,
	// 			skills: skills && skills.length > 0 ? skills : [],
	// 			unions: unions && unions.length > 0 ? unions : [],
	// 			locations: locations && locations.length > 0 ? locations : [],
	// 			experienceLevels: experienceLevels && experienceLevels.length > 0 ? experienceLevels : [],
	// 			genderIdentities: genderIdentities && genderIdentities.length > 0 ? genderIdentities : [],
	// 			racialIdentities: racialIdentities && racialIdentities.length > 0 ? racialIdentities : [],
	// 			personalIdentities:
	// 				personalIdentities && personalIdentities.length > 0 ? personalIdentities : [],
	// 			first: items_per_query,
	// 			after: afterCursor,
	// 		},
	// 		fetchPolicy: 'network-only',
	// 	});
	// };

	return (
		<Box>
			<Text fontSize='sm' pb={2}>
				{resultsString}
			</Text>
			<CandidateList userIds={resultsList} />
			{/* <Button onClick={handleLoadMore}>More Results</Button> */}
		</Box>
	);
}
