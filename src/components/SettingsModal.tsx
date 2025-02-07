import { ReactNode } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	ModalHeader,
} from '@chakra-ui/react';

interface Props {
	title?: string;
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export const SettingsModal = ({ title, isOpen, onClose, children }: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside' size='2xl'>
			<ModalOverlay />
			<ModalContent p={6}>
				{title ? <ModalHeader pb={0}>{title}</ModalHeader> : false}
				<ModalBody>{children}</ModalBody>
				<ModalCloseButton />
			</ModalContent>
		</Modal>
	);
};
