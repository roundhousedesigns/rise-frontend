import { Box, Text } from '@chakra-ui/react';
import SavedSearchItemList from '@components/SavedSearchItemList';

export default function SavedSearchesView() {
	return (
		<Box my={4}>
			<SavedSearchItemList mt={4} />
		</Box>
	);
}
