import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	Button,
	Text,
	useToast,
} from '@chakra-ui/react';
import TextInput from './common/inputs/TextInput';
import { FormEvent, useRef, useState } from 'react';
import useSaveSearch from '@/hooks/mutations/useSaveSearch';
import useViewer from '@/hooks/queries/useViewer';
import { SearchFilterSetRaw } from '@/lib/types';

interface Props {
	id: number;
	title: string;
	searchTerms: SearchFilterSetRaw;
	isOpen: boolean;
	onClose: () => void;
}

export default function EditSavedSearchModal({ id, title, searchTerms, isOpen, onClose }: Props) {
	const { loggedInId } = useViewer();

	const toast = useToast();

	const initialSaveModalRef = useRef(null);

	const { saveSearchMutation } = useSaveSearch();

	const [saveSearchFieldText, setSaveSearchFieldText] = useState<string>(title ? title : '');

	const handleEditOnClose = () => {
		setSaveSearchFieldText(title ? title : '');

		onClose();
	};

	const handleSavedSearchNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSaveSearchFieldText(event.target.value);
	};

	const handleSave = (e: FormEvent) => {
		e.preventDefault();

		saveSearchMutation({
			userId: loggedInId,
			title: saveSearchFieldText,
			filterSet: searchTerms,
			id,
		}).then(() => {
			toast({
				title: 'Saved!',
				description:
					'All of your saved searches are available in the Search Drawer and in the main menu.',
				position: 'bottom',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});

			setSaveSearchFieldText('');
			onClose();
		});
	};

	return (
		<Modal initialFocusRef={initialSaveModalRef} isOpen={isOpen} onClose={handleEditOnClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader pb={2}>{!!title ? 'Rename this search' : 'Save this search'}</ModalHeader>
				<ModalCloseButton />

				<ModalBody pb={6}>
					<Text fontSize='sm' mt={0}>
						Give this search a short, descriptive name to easily run it again.
					</Text>

					<form id='rename-search' onSubmit={handleSave}>
						<FormControl>
							<FormLabel aria-label='Name' visibility='hidden' position='absolute' left='9000px'>
								Name
							</FormLabel>
							<TextInput
								name='title'
								placeholder='My search'
								onChange={handleSavedSearchNameChange}
								value={saveSearchFieldText}
								ref={initialSaveModalRef}
							/>
						</FormControl>
						<Button
							colorScheme='blue'
							mr={3}
							type='submit'
							isDisabled={saveSearchFieldText === title}
						>
							Save
						</Button>
						<Button onClick={handleEditOnClose} colorScheme='red'>
							Cancel
						</Button>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
