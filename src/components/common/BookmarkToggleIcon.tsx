import { useState } from 'react';
import { IconButton, useColorMode, useToken } from '@chakra-ui/react';
import { FiBookmark } from 'react-icons/fi';
import { toggleArrayItem } from '../../lib/utils';
import useViewer from '../../hooks/queries/useViewer';
import useUpdateBookmarkedProfiles from '../../hooks/mutations/useUpdateBookmarkedProfiles';

interface Props {
	id: number;
	isDisabled?: boolean;
	[prop: string]: any;
}

export default function BookmarkToggleIcon({ id, isDisabled, ...props }: Props) {
	const { loggedInId, bookmarkedProfiles } = useViewer();
	const [isBookmarked, setIsBookmarked] = useState<boolean>(bookmarkedProfiles.includes(id));
	const { updateBookmarkedProfilesMutation } = useUpdateBookmarkedProfiles();

	const { colorMode } = useColorMode();

	const [orange, lightGray, darkGray] = useToken('colors', [
		'brand.orange',
		'gray.300',
		'gray.600',
	]);

	const updateBookmarkedProfilesHandler = () => {
		if (!id) return;
		const updatedBookmarkedProfiles = toggleArrayItem(bookmarkedProfiles, id);

		// Optimism!
		setIsBookmarked(!isBookmarked);

		// Fire the mutation.
		updateBookmarkedProfilesMutation(loggedInId, updatedBookmarkedProfiles);
	};

	const iconLabel = isBookmarked
		? 'Remove this candidate from your saved candidates'
		: 'Save this candidate';

	return (
		<IconButton
			icon={
				<FiBookmark
					color={isBookmarked ? orange : ''}
					fill={isBookmarked ? orange : 'transparent'}
					stroke={colorMode === 'dark' ? lightGray : darkGray}
					strokeWidth={1}
					size={32}
				/>
			}
			variant='bookmark'
			aria-label={iconLabel}
			title={iconLabel}
			onClick={updateBookmarkedProfilesHandler}
			mx={2}
			py={1}
			px={2}
			{...props}
		/>
	);
}
