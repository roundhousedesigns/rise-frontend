import { Spinner, useColorMode, useDisclosure, useToken } from '@chakra-ui/react';
import { FiMinusCircle } from 'react-icons/fi';
import ConfirmActionDialog from '@common/ConfirmActionDialog';
import useUpdateStarredProfiles from '@hooks/mutations/useUpdateStarredProfiles';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

interface Props {
	id: number;
	handleRemoveStar: (id: number) => void;
}

export default function RemoveStarIcon({ id, handleRemoveStar }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();
	const [orange, light, dark] = useToken('colors', ['orange.300', 'gray.50', 'gray.900']);

	const {
		results: { data: { updateStarredProfiles: { toggledId = null } = {} } = {}, loading },
	} = useUpdateStarredProfiles();

	const iconLabel = 'Remove';

	const handleRemove = () => {
		handleRemoveStar(id);
		onClose();
	};

	const Icon = () =>
		loading && toggledId === id ? (
			<Spinner />
		) : (
			<FiMinusCircle
				color={orange}
				fill={orange}
				stroke={colorMode === 'dark' ? dark : light}
				strokeWidth={2}
				size={30}
			/>
		);

	return (
		<>
			<TooltipIconButton
				icon={<Icon />}
				borderRadius='full'
				label={iconLabel}
				onClick={onOpen}
				mr={2}
			/>
			<ConfirmActionDialog
				isOpen={isOpen}
				onClose={onClose}
				confirmAction={handleRemove}
				headerText='Unstar this profile?'
				buttonsText={{ confirm: 'Yes', cancel: 'No' }}
			>
				Are you sure you want to unstar this profile? You can always star it again later.
			</ConfirmActionDialog>
		</>
	);
}
