import { useEffect, useState } from 'react';
import { useColorMode, useDisclosure, useToken } from '@chakra-ui/react';
import { FiMinusCircle, FiStar } from 'react-icons/fi';
import useViewer from '@hooks/queries/useViewer';
import useUpdateStarredProfiles from '@hooks/mutations/useUpdateStarredProfiles';
import TooltipIconButton from '@common/inputs/TooltipIconButton';
import ConfirmActionDialog from '@common/ConfirmActionDialog';

interface Props {
	id: number;
	[prop: string]: any;
}

export default function StarToggleIcon({ id, ...props }: Props) {
	const [{ starredProfiles }] = useViewer();
	const [isStarred, setIsStarred] = useState<boolean>(false);
	const [hovered, setHovered] = useState<boolean>(false);

	const {
		updateStarredProfilesMutation,
		results: { loading },
	} = useUpdateStarredProfiles();

	const { colorMode } = useColorMode();
	const [orange, lightGray, darkGray] = useToken('colors', ['orange.300', 'gray.300', 'gray.600']);

	const {
		isOpen: isOpenConfirmation,
		onOpen: onOpenConfirmation,
		onClose: onCloseConfirmation,
	} = useDisclosure();

	// Sets whether or not the profile is starred.
	useEffect(() => {
		if (starredProfiles) {
			setIsStarred(starredProfiles.includes(id));
		}

		return () => setIsStarred(false);
	}, [JSON.stringify(starredProfiles), id]);

	const updateStarredProfilesHandler = () => {
		if (!id) return;

		// Fire the mutation
		updateStarredProfilesMutation(id).then(() => {
			onCloseConfirmation();
		});
	};

	return (
		<>
			<TooltipIconButton
				icon={
					hovered && isStarred ? (
						<FiMinusCircle fill={orange} />
					) : (
						<FiStar
							color={isStarred ? orange : ''}
							fill={isStarred ? orange : 'transparent'}
							stroke={colorMode === 'dark' ? lightGray : darkGray}
							size={20}
						/>
					)
				}
				cursor={loading ? 'default !important' : 'pointer'}
				borderRadius='full'
				label={isStarred ? 'Unstar this profile' : 'Star this profile'}
				onClick={isStarred ? onOpenConfirmation : updateStarredProfilesHandler}
				mx={2}
				isLoading={loading}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				{...props}
			/>

			<ConfirmActionDialog
				isOpen={isOpenConfirmation}
				onClose={onCloseConfirmation}
				confirmAction={updateStarredProfilesHandler}
				headerText='Unstar this profile?'
				buttonsText={{ confirm: 'Yes', cancel: 'No' }}
			>
				Are you sure you want to unstar this profile? You can always star it again later.
			</ConfirmActionDialog>
		</>
	);
}
