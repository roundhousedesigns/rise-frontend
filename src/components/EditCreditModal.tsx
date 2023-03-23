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

import { EditProfileContext } from '../context/EditProfileContext';
import { useContext } from 'react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	creditId: string;
}

export default function EditCreditModal({ isOpen, onClose, creditId }: Props): JSX.Element {
	const { editProfile } = useContext(EditProfileContext);

	const credit = editProfile.credits?.find((credit) => credit.id === creditId);

	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside' size='4xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Heading size='lg'>Edit Credit</Heading>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{credit ? <EditCreditView credit={credit} onClose={onClose} /> : 'No credit found.'}
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
}
