import { useState } from 'react';
import { Card, Text, IconButton } from '@chakra-ui/react';
import { FiBookmark } from 'react-icons/fi';
import SavedCandidateList from './SavedCandidateList';

export default function SavedProfilesView() {
	const [bookmarkOn, setBookmarkOn] = useState<boolean>(false);

	return (
		<>
			<Text size='sm' my={0} display='flex' alignItems='center' flexWrap='wrap'>
				To save someone's profile, click the{' '}
				<IconButton
					icon={<FiBookmark />}
					variant='inline'
					mx={1}
					fill={bookmarkOn ? 'brand.orange' : 'transparent'}
					aria-label='Sample bookmark icon'
					title='Bookmark'
					onClick={() => setBookmarkOn(!bookmarkOn)}
				/>{' '}
				icon on a person's profile, or next to a name in search results.
			</Text>
			<Card title='Saved Profiles'>
				<SavedCandidateList my={0} />
			</Card>
		</>
	);
}
