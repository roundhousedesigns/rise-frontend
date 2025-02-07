import { useDisclosure } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import ConfirmActionDialog from '@common/ConfirmActionDialog';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

interface Props {
	id: string;
	handleDeleteCredit: (id: string) => void;
}

export default function DeleteCreditButton({ handleDeleteCredit, id }: Props): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDelete = () => {
		handleDeleteCredit(id);
		onClose();
	};

	return (
		<>
			<TooltipIconButton
				colorScheme='red'
				icon={<FiTrash2 />}
				label={'Delete Credit'}
				onClick={onOpen}
			/>

			<ConfirmActionDialog
				isOpen={isOpen}
				onClose={onClose}
				confirmAction={handleDelete}
				headerText={'Delete Credit'}
				buttonsText={{ confirm: 'Delete' }}
			>
				Are you sure you want to permanently delete this credit?
			</ConfirmActionDialog>
		</>
	);
}
