import {
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
} from '@chakra-ui/react';
import EditCreditView from '../views/EditCreditView';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	creditId: string;
}

export default function EditCreditModal({ isOpen, onClose, creditId }: Props): JSX.Element {
	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside' size='4xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalBody px={4} pb={4}>
					{creditId ? <EditCreditView creditId={creditId} onClose={onClose} /> : 'No credit found.'}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
