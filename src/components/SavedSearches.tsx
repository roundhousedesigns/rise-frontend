import { List, ListItem, Heading, Text, Box } from '@chakra-ui/react';
import { extractSearchTermIds } from '@lib/utils';
import { SearchFilterSetRaw } from '@lib/types';
import useViewer from '@hooks/queries/useViewer';
import SavedSearchItem from '@common/SavedSearchItem';

export default function SavedSearchItemes() {
	const { savedSearches } = useViewer();

	// Get the term IDs for each search.
	const savedSearchesArr = savedSearches ? JSON.parse(savedSearches) : [];
	const searchTermIdSets = savedSearchesArr
		? savedSearchesArr.map((search: SearchFilterSetRaw) => extractSearchTermIds(search))
		: [];

	return (
		<Box>
			<Heading as='h2' variant='pageSubtitle' color='white'>
				Saved Searches
			</Heading>
			<Text>Save your most common searches here:</Text>

			{searchTermIdSets.length > 0 ? (
				<List spacing={2}>
					{searchTermIdSets.map((_ignored: any, index: number) => (
						<ListItem key={index}>
							<SavedSearchItem
								searchTerms={savedSearchesArr[index]}
								deleteButton={true}
								rerunButton={true}
							/>
						</ListItem>
					))}
				</List>
			) : (
				<Text fontSize='sm'>No saved searches.</Text>
			)}
		</Box>
	);
}
