import {
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	// ModalFooter,
	// ModalHeader,
} from '@chakra-ui/react';
import EditCreditView from './EditCreditView';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	creditId: string;
}

// TODO Incorporate Modal header and footer save/cancel

export default function EditCreditModal({ isOpen, onClose, creditId }: Props): JSX.Element {
	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside' size='4xl'>
			<ModalOverlay />
			<ModalContent>
				{/* <ModalHeader></ModalHeader> */}
				<ModalBody px={4} pb={4}>
					{creditId ? <EditCreditView creditId={creditId} onClose={onClose} /> : 'No credit found.'}
				</ModalBody>
				{/* <ModalFooter></ModalFooter> */}
			</ModalContent>
		</Modal>
	);
}
