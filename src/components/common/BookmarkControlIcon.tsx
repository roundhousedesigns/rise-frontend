import { useState } from 'react';
import { IconButton, useToken } from '@chakra-ui/react';
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
	const [brandOrange, brandRed, lightGray] = useToken('colors', [
		'brand.orange',
		'brand.red',
		'gray.300',
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
					<FiMinusCircle color={brandRed} fill={brandRed} stroke={lightGray} strokeWidth={2} />
				) : (
					<FiBookmark
						color={localIsBookmarked ? brandOrange : ''}
						fill={localIsBookmarked ? brandOrange : 'transparent'}
						stroke={lightGray}
						strokeWidth={2}
					/>
				)
			}
			aria-label={iconLabel}
			title={iconLabel}
			onClick={updateBookmarkedProfilesHandler}
			boxSize={10}
			borderRadius='full'
			size='xl'
			bg='transparent'
			mr={removeItem ? 0 : 1}
			ml={removeItem ? 1 : 0}
			py={2}
			px={1}
			cursor='pointer'
			{...props}
		/>
	);
}
