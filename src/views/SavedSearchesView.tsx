import { Box, Text } from '@chakra-ui/react';
import SavedSearchItemList from '@components/SavedSearchItemList';

export default function SavedSearchesView() {
	return (
		<Box my={4}>
			<Text fontSize='sm'>
				Save your searches to easily repeat them. To save one, click the "Save" button at the top of
				the Search Results page.
			</Text>
			<SavedSearchItemList mt={4} />
		</Box>
	);
}
