import { Text, IconButton, Box } from '@chakra-ui/react';
import { FiBookmark, FiThumbsUp } from 'react-icons/fi';
import BookmarkedCandidateList from '@views/BookmarkedCandidateList';

export default function BookmarkedProfilesView() {
	return (
		<Box>
			<Text size='sm' my={0} display='flex' alignItems='center' flexWrap='wrap'>
				Click the{' '}
				<IconButton
					icon={<FiBookmark />}
					variant='sampleIconButton'
					mx={1}
					aria-label='Sample unclickable bookmark icon'
					title='Bookmark'
					bgColor='orange.400'
				/>{' '}
				to save a candidate to your bookmarks list. A{' '}
				<IconButton
					icon={<FiThumbsUp />}
					variant='sampleIconButton'
					mx={1}
					aria-label='Sample thumbs up icon'
					title='Looking for work'
					bgColor='green.500'
				/>{' '}
				indicates that a candidate is looking for work.
			</Text>

			<BookmarkedCandidateList my={0} />
		</Box>
	);
}
