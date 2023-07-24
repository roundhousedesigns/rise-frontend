import { useState } from 'react';
import { IconButton, useColorMode, useToken } from '@chakra-ui/react';
import { FiBookmark, FiMinusCircle } from 'react-icons/fi';
import { toggleArrayItem } from '../../lib/utils';
import useViewer from '../../hooks/queries/useViewer';
import useUpdateBookmarkedProfiles from '../../hooks/mutations/useUpdateBookmarkedProfiles';

interface Props {
	id: number;
	isBookmarked?: boolean;
	removeItem?: boolean;
	isDisabled?: boolean;
	[prop: string]: any;
}

export default function BookmarkControlIcon({
	id,
	isBookmarked,
	removeItem,
	isDisabled,
	...props
}: Props) {
	const { loggedInId, bookmarkedProfiles } = useViewer();
	const [localIsBookmarked, setLocalIsBookmarked] = useState<boolean>(
		typeof isBookmarked === 'boolean' ? isBookmarked : false
	);
	const { updateBookmarkedProfilesMutation } = useUpdateBookmarkedProfiles();
	const { colorMode } = useColorMode();
	const [orange, red, lightGray, darkGray] = useToken('colors', [
		'brand.orange',
		'brand.red',
		'gray.300',
		'gray.600',
	]);

	const updateBookmarkedProfilesHandler = () => {
		if (!id) return;

		const updatedBookmarkedProfiles = toggleArrayItem(bookmarkedProfiles, id);

		// Optimism!
		setLocalIsBookmarked(!localIsBookmarked);

		// Fire off the mutation.
		updateBookmarkedProfilesMutation(loggedInId, updatedBookmarkedProfiles);
	};

	const iconLabel =
		removeItem || localIsBookmarked
			? 'Remove this candidate from your saved candidates'
			: 'Save this candidate';

	return (
		<IconButton
			icon={
				removeItem ? (
					<FiMinusCircle color={red} fill={red} stroke={lightGray} strokeWidth={2} size={30} />
				) : (
					<FiBookmark
						color={localIsBookmarked ? orange : ''}
						fill={localIsBookmarked ? orange : 'transparent'}
						stroke={colorMode === 'dark' ? lightGray : darkGray}
						strokeWidth={1}
						size={24}
					/>
				)
			}
			variant={removeItem ? 'remove' : 'bookmark'}
			aria-label={iconLabel}
			title={iconLabel}
			onClick={updateBookmarkedProfilesHandler}
			mr={removeItem ? 0 : 2}
			{...props}
		/>
	);
}
