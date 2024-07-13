import { useState } from 'react';
import { useColorMode, useToken } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';
import useViewer from '@hooks/queries/useViewer';
import useUpdateStarredProfiles from '@hooks/mutations/useUpdateStarredProfiles';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

interface Props {
	id: number;
	isDisabled?: boolean;
	[prop: string]: any;
}

export default function StarToggleIcon({ id, isDisabled, ...props }: Props) {
	const { starredProfiles } = useViewer();
	const [isStarred, setIsStarred] = useState<boolean>(starredProfiles.includes(id));
	const { updateStarredProfilesMutation } = useUpdateStarredProfiles();

	const { colorMode } = useColorMode();
	const [orange, lightGray, darkGray] = useToken('colors', ['orange.300', 'gray.300', 'gray.600']);

	const updateStarredProfilesHandler = () => {
		if (!id) return;

		// Optimistically update local state
		setIsStarred(!isStarred);

		// Fire the mutation
		updateStarredProfilesMutation(id);
	};

	const iconLabel = isStarred ? 'Unstar this profile' : 'Star this profile';

	return (
		<TooltipIconButton
			icon={
				<FiStar
					color={isStarred ? orange : ''}
					fill={isStarred ? orange : 'transparent'}
					stroke={colorMode === 'dark' ? lightGray : darkGray}
					size={20}
				/>
			}
			cursor='pointer'
			borderRadius='full'
			label={iconLabel}
			onClick={updateStarredProfilesHandler}
			mx={2}
			{...props}
		/>
	);
}
