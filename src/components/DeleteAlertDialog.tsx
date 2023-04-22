import { useRef } from 'react';
import {
	IconButton,
	Button,
	useDisclosure,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';

interface Props {
	handleDeleteCredit: (id: string) => void;
	id: string;
}

export function DeleteAlertDialog({ handleDeleteCredit, id: itemId }: Props): JSX.Element {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);

	const handleDelete = () => {
		handleDeleteCredit(itemId);
		onClose();
	};

	return (
		<>
			<IconButton
				size='lg'
				colorScheme='red'
				icon={<FiTrash />}
				aria-label='Delete Credit'
				onClick={onOpen}
			/>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Credit
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure you want to permanently delete this credit?
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='red' onClick={handleDelete} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
