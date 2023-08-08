import { IconButton, useDisclosure } from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';
import ConfirmActionDialog from './common/ConfirmActionDialog';

interface Props {
	handleDeleteCredit: (id: string) => void;
	id: string;
}

export default function DeleteCreditButton({ handleDeleteCredit, id: itemId }: Props): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDelete = () => {
		handleDeleteCredit(itemId);
		onClose();
	};

	return (
		<>
			<IconButton
				colorScheme='red'
				icon={<FiTrash />}
				aria-label='Delete Credit'
				onClick={onOpen}
			/>

			<ConfirmActionDialog
				isOpen={isOpen}
				onClose={onClose}
				confirmAction={handleDelete}
				headerText='Delete Credit'
				buttonsText={{ confirm: 'Delete' }}
			>
				Are you sure you want to permanently delete this credit?
			</ConfirmActionDialog>
		</>
	);
}
