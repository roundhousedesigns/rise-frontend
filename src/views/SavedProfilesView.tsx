import { useState } from 'react';
import { Card, Text, IconButton } from '@chakra-ui/react';
import { FiBookmark } from 'react-icons/fi';
import SavedCandidateList from './SavedCandidateList';

export default function SavedProfilesView() {
	const [bookmarkOn, setBookmarkOn] = useState<boolean>(false);

	return (
		<Card title='Saved Profiles'>
			<Text size='sm' mt='0' display='flex' alignItems='center' flexWrap='wrap'>
				To save a profile, click the{' '}
				<IconButton
					icon={<FiBookmark />}
					mx={1}
					fill={bookmarkOn ? 'brand.orange' : 'transparent'}
					cursor='pointer'
					p={1}
					boxSize={6}
					aria-label='Sample bookmark icon'
					title='Bookmark'
					onClick={() => setBookmarkOn(!bookmarkOn)}
				/>{' '}
				icon on or next to a profile.
			</Text>
			<SavedCandidateList />
		</Card>
	);
}
