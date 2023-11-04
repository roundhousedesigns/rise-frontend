import { List, ListItem, Heading, Text, Box, Card, Flex } from '@chakra-ui/react';
import useViewer from '@hooks/queries/useViewer';
import SavedSearchItem from '@common/SavedSearchItem';
import useSavedSearches from '@/hooks/queries/useSavedSearches';
import { WPPost } from '@/lib/classes';

export default function SavedSearchItems() {
	const { loggedInId } = useViewer();
	const [savedSearches] = useSavedSearches(loggedInId);

	return (
		<Box>
			<Heading variant='contentSubtitle'>
				Saved Searches
			</Heading>

			{savedSearches && savedSearches.length > 0 ? (
				<Flex as={List} gap={2} flexWrap='wrap'>
					{savedSearches.map((savedSearch: WPPost) => {
						const { id, content, title } = savedSearch;
						if (!content) {
							return;
						}

						const filters = JSON.parse(content);

						return (
							<Card
								as={ListItem}
								key={id}
								my={0}
								py={2}
								flex='auto'
								maxWidth='half'
								_dark={{ bgColor: 'gray.800' }}
								_light={{ bgColor: 'gray.50' }}
							>
								<SavedSearchItem
									id={id}
									searchTerms={filters}
									title={title}
								/>
							</Card>
						);
					})}
				</Flex>
			) : (
				<Text fontSize='sm'>No saved searches.</Text>
			)}
		</Box>
	);
}
