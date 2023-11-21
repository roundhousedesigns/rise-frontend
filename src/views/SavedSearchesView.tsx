import { Box, Container, Text } from '@chakra-ui/react';
import SavedSearchItems from '@/components/SavedSearchItems';

export default function SavedSearchesView() {
	return (
		<Box my={4}>
			<Container textAlign='left' ml={0} pl={0}>
				<Text>
					Save your searches to easily repeat them. To save one, click the "Save" button at the top
					of the Search Results page.
				</Text>
			</Container>
			<SavedSearchItems mt={4} />
		</Box>
	);
}
