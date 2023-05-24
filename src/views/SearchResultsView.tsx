import { useContext, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import CandidateList from '../components/common/CandidateList';

import { useCandidateSearch } from '../hooks/queries/useCandidateSearch';
import { useViewer } from '../hooks/queries/useViewer';
import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const { loggedInId } = useViewer();
	const {
		search: {
			filters: {
				positions: { jobs, department },
				skills,
				unions,
				locations,
				experienceLevels,
				genderIdentities,
				racialIdentities,
				personalIdentities,
			},
			results,
			searchActive,
		},
	} = useContext(SearchContext);

	const items_per_query = 1;

	const [afterCursor, setAfterCursor] = useState<string>('');

	const handleSearchComplete = (after: string) => {
		setAfterCursor(after);
	};

	const [getSearchResults, { data }] = useCandidateSearch(handleSearchComplete);

	const resultsString =
		searchActive === false
			? 'Start a search to see results.'
			: results.length === 0
			? 'No results.'
			: results.length === 1
			? '1 result.'
			: `${results.length} results.`;

	const handleLoadMore = () => {
		// set the positions array to the jobs array if it's not empty, otherwise use the department array
		const positions = jobs.length > 0 ? jobs : department;

		getSearchResults({
			variables: {
				positions,
				skills: skills && skills.length > 0 ? skills : [],
				unions: unions && unions.length > 0 ? unions : [],
				locations: locations && locations.length > 0 ? locations : [],
				experienceLevels: experienceLevels && experienceLevels.length > 0 ? experienceLevels : [],
				genderIdentities: genderIdentities && genderIdentities.length > 0 ? genderIdentities : [],
				racialIdentities: racialIdentities && racialIdentities.length > 0 ? racialIdentities : [],
				personalIdentities:
					personalIdentities && personalIdentities.length > 0 ? personalIdentities : [],
				exclude: loggedInId,
				first: items_per_query,
				after: afterCursor,
			},
			fetchPolicy: 'network-only',
		});
	};

	return (
		<Box>
			<Text fontSize='sm' pb={2}>
				{resultsString}
			</Text>
			{searchActive ? (
				<>
					<CandidateList userIds={results} />
					<Button onClick={handleLoadMore}>More Results</Button>
				</>
			) : null}
		</Box>
	);
}
