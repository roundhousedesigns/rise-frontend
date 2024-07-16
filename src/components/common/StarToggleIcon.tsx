import { useEffect, useState } from 'react';
import { useColorMode, useDisclosure, useToken } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';
import useViewer from '@hooks/queries/useViewer';
import useUpdateStarredProfiles from '@hooks/mutations/useUpdateStarredProfiles';
import TooltipIconButton from '@common/inputs/TooltipIconButton';
import ConfirmActionDialog from '@common/ConfirmActionDialog';

interface Props {
	id: number;
	[prop: string]: any;
}

export default function StarToggleIcon({ id, ...props }: Props) {
	const { loggedInId, starredProfiles } = useViewer();
	const [isStarred, setIsStarred] = useState<boolean>(false);
	const {
		updateStarredProfilesMutation,
		results: { loading },
	} = useUpdateStarredProfiles();

	const { colorMode } = useColorMode();
	const [orange, lightGray, darkGray] = useToken('colors', ['orange.300', 'gray.300', 'gray.600']);

	const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	useEffect(() => {
		if (starredProfiles) {
			setIsStarred(starredProfiles.includes(id));
		}
	}, [starredProfiles, id]);

	const updateStarredProfilesHandler = () => {
		if (!id) return;

		// Optimistically update local state
		setIsStarred(!isStarred);

		// Fire the mutation
		updateStarredProfilesMutation(id);
	};

	const iconLabel = isStarred ? 'Unstar this profile' : 'Star this profile';

	return (
		<>
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
				onClick={isStarred ? onOpenConfirm : updateStarredProfilesHandler}
				mx={2}
				isLoading={loading}
				isDisabled={!loggedInId}
				{...props}
			/>

			<ConfirmActionDialog
				isOpen={isOpenConfirm}
				onClose={onCloseConfirm}
				confirmAction={updateStarredProfilesHandler}
				headerText='Unstar this profile?'
				buttonsText={{ confirm: 'Yes', cancel: 'No' }}
			>
				Are you sure you want to unstar this profile? You can always star it again later.
			</ConfirmActionDialog>
		</>
	);
}
