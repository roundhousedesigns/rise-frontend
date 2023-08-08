import { Text, IconButton, Box } from '@chakra-ui/react';
import { FiBookmark } from 'react-icons/fi';
import SavedCandidateList from './SavedCandidateList';

export default function SavedProfilesView() {
	return (
		<Box>
			<Text size='sm' my={0} display='flex' alignItems='center' flexWrap='wrap'>
				To save someone's profile, click the{' '}
				<IconButton
					icon={<FiBookmark />}
					variant='inline'
					mx={1}
					aria-label='Sample bookmark icon'
					title='Bookmark'
				/>{' '}
				icon on a person's profile, or next to a name in search results.
			</Text>

			<SavedCandidateList my={0} />
		</Box>
	);
}
