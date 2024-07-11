import { IconButton, Text } from '@chakra-ui/react';
import BookmarkedCandidateList from '@views/BookmarkedCandidateList';
import useViewer from '@hooks/queries/useViewer';
import { FiStar } from 'react-icons/fi';

export default function BookmarkedProfilesView() {
	const { bookmarkedProfiles } = useViewer();
	return (
		<>
			{bookmarkedProfiles.length === 0 ? (
				<Text size='sm' my={0} display='flex' alignItems='center' flexWrap='wrap'>
					No saved profiles. Click a{' '}
					<IconButton
						icon={<FiStar />}
						variant='sampleIconButton'
						mx={1}
						aria-label='Sample unclickable bookmark icon'
						title='Bookmark'
						bgColor='gray.200'
						color='text.dark'
					/>{' '}
					to save a profile to your list.
				</Text>
			) : (
				false
			)}

			<BookmarkedCandidateList my={8} />
		</>
	);
}
