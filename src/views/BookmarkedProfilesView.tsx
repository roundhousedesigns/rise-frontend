import { Text, IconButton, Box } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';
import BookmarkedCandidateList from '@views/BookmarkedCandidateList';

export default function BookmarkedProfilesView() {
	return (
		<Box>
			<Text size='sm' my={0} display='flex' alignItems='center' flexWrap='wrap'>
				Click the{' '}
				<IconButton
					icon={<FiStar />}
					variant='sampleIconButton'
					mx={1}
					aria-label='Sample unclickable bookmark icon'
					title='Bookmark'
					bgColor='orange.400'
				/>{' '}
				to save a candidate to your bookmarks list.
			</Text>

			<BookmarkedCandidateList my={0} />
		</Box>
	);
}
