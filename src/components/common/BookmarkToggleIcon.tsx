import { useState } from 'react';
import { IconButton, useToken } from '@chakra-ui/react';
import { FiBookmark } from 'react-icons/fi';
import { toggleArrayItem } from '../../lib/utils';
import useViewer from '../../hooks/queries/useViewer';
import useUpdateBookmarkedProfiles from '../../hooks/mutations/useUpdateBookmarkedProfiles';

interface Props {
	id: number;
	isBookmarked?: boolean;
	isDisabled?: boolean;
	[prop: string]: any;
}

export default function BookmarkToggleIcon({ id, isBookmarked, isDisabled, ...props }: Props) {
	const { loggedInId, bookmarkedProfiles } = useViewer();
	const [localIsBookmarked, setLocalIsBookmarked] = useState<boolean>(
		typeof isBookmarked === 'boolean' ? isBookmarked : false
	);
	const { updateBookmarkedProfilesMutation } = useUpdateBookmarkedProfiles();
	const [brandOrange, lightGray] = useToken('colors', ['brand.orange', 'gray.300']);

	const updateBookmarkedProfilesHandler = () => {
		if (!id) return;

		const updatedBookmarkedProfiles = toggleArrayItem(bookmarkedProfiles, id);

		// Optimism!
		setLocalIsBookmarked(!localIsBookmarked);

		// Fire off the mutation.
		updateBookmarkedProfilesMutation(loggedInId, updatedBookmarkedProfiles);
	};

	return (
		<IconButton
			icon={
				<FiBookmark
					color={localIsBookmarked ? brandOrange : ''}
					fill={localIsBookmarked ? brandOrange : 'transparent'}
					stroke={lightGray}
					strokeWidth={2}
				/>
			}
			aria-label={
				localIsBookmarked
					? 'Remove this candidate from your saved candidates'
					: 'Save this candidate'
			}
			title='Toggle bookmark'
			onClick={updateBookmarkedProfilesHandler}
			boxSize={10}
			size='xl'
			bg='transparent'
			py={2}
			px={1}
			cursor='pointer'
			{...props}
		/>
	);
}
