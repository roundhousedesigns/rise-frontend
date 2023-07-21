import { useState } from 'react';
import { IconButton, useToken } from '@chakra-ui/react';
import { FiBookmark } from 'react-icons/fi';
import { toggleArrayItem } from '../../lib/utils';
import useViewer from '../../hooks/queries/useViewer';
import useUpdateStarredProfiles from '../../hooks/mutations/useUpdateStarredProfiles';

interface Props {
	id: number;
	isStarred?: boolean;
	isDisabled?: boolean;
	[prop: string]: any;
}

export default function BookmarkToggleIcon({ id, isStarred, isDisabled, ...props }: Props) {
	const { loggedInId, starredProfiles } = useViewer();
	const [localIsStarred, setLocalIsStarred] = useState<boolean>(
		typeof isStarred === 'boolean' ? isStarred : false
	);
	const { updateStarredProfilesMutation } = useUpdateStarredProfiles();
	const [brandOrange, lightGray] = useToken('colors', ['brand.orange', 'gray.300']);

	const updateStarredProfilesHandler = () => {
		if (!id) return;

		const updatedStarredProfiles = toggleArrayItem(starredProfiles, id);

		setLocalIsStarred(!localIsStarred);

		updateStarredProfilesMutation(loggedInId, updatedStarredProfiles)
			.then((res) => {
				console.info(res);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<IconButton
			icon={
				<FiBookmark
					color={localIsStarred ? brandOrange : ''}
					fill={localIsStarred ? brandOrange : 'transparent'}
					stroke={lightGray}
					strokeWidth={2}
				/>
			}
			aria-label={
				localIsStarred ? 'Remove this candidate from your saved candidates' : 'Save this candidate'
			}
			title='Toggle bookmark'
			onClick={updateStarredProfilesHandler}
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
