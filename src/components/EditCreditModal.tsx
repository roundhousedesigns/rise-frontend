import { Modal, ModalOverlay, ModalBody, ModalContent } from '@chakra-ui/react';
import { Credit } from '@lib/classes';
import EditCreditView from '@views/EditCreditView';

interface Props {
	credit: Credit | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function EditCreditModal({ credit, isOpen, onClose }: Props): JSX.Element | null {
	return credit ? (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior={'outside'} size={'3xl'}>
			<ModalOverlay />F
			<ModalContent>
				<ModalBody px={8} pb={4}>
					{credit ? <EditCreditView credit={credit} onClose={onClose} /> : 'No credit found.'}
				</ModalBody>
			</ModalContent>
		</Modal>
	) : null;
}
