import {
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import EditCreditView from './EditCreditView';

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
				<ModalHeader>
					<Heading size='lg'>Edit Credit</Heading>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{creditId ? <EditCreditView creditId={creditId} onClose={onClose} /> : 'No credit found.'}
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
}
