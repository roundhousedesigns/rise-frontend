import { List, ListItem, Heading, Text, Box } from '@chakra-ui/react';
import { extractSearchTermIds } from '../../lib/utils';
import { SearchFilterSetRaw } from '../../lib/types';
import useViewer from '../../hooks/queries/useViewer';
import SavedSearch from './SavedSearch';

export default function SearchHistory() {
	const { searchHistory } = useViewer();

	// Get the term IDs for each search.
	const searchHistoryArr = searchHistory ? JSON.parse(searchHistory) : [];
	const searchTermIdSets = searchHistoryArr
		? searchHistoryArr.map((search: SearchFilterSetRaw) => extractSearchTermIds(search))
		: [];

	return (
		<Box>
			<Heading as='h2' variant='pageSubtitle' color='white'>
				Search History
			</Heading>
			<Text>
				<Text as='span' textDecoration='underline'>
					Rerun
				</Text>{' '}
				or{' '}
				<Text as='span' textDecoration='underline'>
					save
				</Text>{' '}
				your last{' '}
				{searchTermIdSets.length > 1 ? `${searchTermIdSets.length} searchTermIdSets` : 'search'}:
			</Text>

			{searchTermIdSets.length > 0 ? (
				<List spacing={2}>
					{searchTermIdSets.map((_ignored: any, index: number) => (
						<ListItem key={index}>
							<SavedSearch searchTerms={searchHistoryArr[index]} />
						</ListItem>
					))}
				</List>
			) : (
				<Text fontSize='sm'>No recent searches.</Text>
			)}
		</Box>
	);
}
