import { useState } from 'react';
import { useColorMode, useToken } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';
import { toggleArrayItem } from '@lib/utils';
import useViewer from '@hooks/queries/useViewer';
import useUpdateBookmarkedProfiles from '@hooks/mutations/useUpdateBookmarkedProfiles';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

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
	const [orange, lightGray, darkGray] = useToken('colors', ['orange.100', 'gray.300', 'gray.600']);

	const updateBookmarkedProfilesHandler = () => {
		if (!id) return;

		// Optimistically update local state
		setIsBookmarked(!isBookmarked);

		// Update the bookmarked profiles list
		const updatedBookmarkedProfiles = toggleArrayItem(bookmarkedProfiles, id);

		// Fire the mutation
		updateBookmarkedProfilesMutation(loggedInId, updatedBookmarkedProfiles);
	};

	const iconLabel = isBookmarked ? 'Unstar this profile' : 'Star this profile';

	return (
		<TooltipIconButton
			icon={
				<FiStar
					color={isBookmarked ? orange : ''}
					fill={isBookmarked ? orange : 'transparent'}
					stroke={colorMode === 'dark' ? lightGray : darkGray}
					size={20}
				/>
			}
			cursor='pointer'
			borderRadius='full'
			label={iconLabel}
			onClick={updateBookmarkedProfilesHandler}
			mx={2}
			{...props}
		/>
	);
}
