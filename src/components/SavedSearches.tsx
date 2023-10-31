import { List, ListItem, Heading, Text, Box, Card } from '@chakra-ui/react';
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
			<Heading as='h2' variant='pageSubtitle'>
				Saved Searches
			</Heading>

			{searchTermIdSets.length > 0 ? (
				<List spacing={2}>
					{searchTermIdSets.map((_ignored: any, index: number) => (
						<Card
							_dark={{ bgColor: 'gray.800' }}
							_light={{ bgColor: 'gray.50' }}
							as={ListItem}
							my={0}
							py={2}
							key={index}
						>
							<SavedSearchItem
								searchTerms={savedSearchesArr[index]}
								deleteButton={true}
								rerunButton={true}
							/>
						</Card>
					))}
				</List>
			) : (
				<Text fontSize='sm'>No saved searches.</Text>
			)}
		</Box>
	);
}
