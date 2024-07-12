import { useColorMode, useDisclosure, useToken } from '@chakra-ui/react';
import { FiMinusCircle } from 'react-icons/fi';
import ConfirmActionDialog from '@common/ConfirmActionDialog';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

interface Props {
	id: number;
	handleRemoveStar: (id: number) => void;
}

export default function RemoveStarIcon({ id, handleRemoveStar }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();
	const [orange, light, dark] = useToken('colors', ['orange.300', 'gray.50', 'gray.900']);

	const iconLabel = 'Remove this candidate from your saved candidates';

	const handleRemove = () => {
		handleRemoveStar(id);
		onClose();
	};

	return (
		<>
			<TooltipIconButton
				icon={
					<FiMinusCircle
						color={orange}
						fill={orange}
						stroke={colorMode === 'dark' ? dark : light}
						strokeWidth={2}
						size={30}
					/>
				}
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
