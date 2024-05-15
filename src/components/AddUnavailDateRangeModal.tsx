import {
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
} from '@chakra-ui/react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default function AddUnavailDateRangeModal({ isOpen, onClose }: Props): JSX.Element {
	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside' size='4xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalBody px={4} pb={4}>
					Hi!
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
