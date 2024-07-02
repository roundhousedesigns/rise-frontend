import {
	useToast,
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
} from '@chakra-ui/react';
import TextInput from './common/inputs/TextInput';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { SearchFilterSet } from '@lib/types';
import { prepareSearchFilterSetRaw } from '@lib/utils';
import useSaveSearch from '@hooks/mutations/useSaveSearch';
import useViewer from '@hooks/queries/useViewer';
import { SearchContext } from '@/context/SearchContext';

interface Props {
	id: number;
	title: string;
	searchTerms: SearchFilterSet;
	isOpen: boolean;
	onClose: () => void;
}

export default function EditSavedSearchModal({ id, title, searchTerms, isOpen, onClose }: Props) {
	const { loggedInId } = useViewer();
	const { searchDispatch } = useContext(SearchContext);
	const initialSaveModalRef = useRef(null);
	const {
		saveSearchMutation,
		results: { loading: saveLoading },
	} = useSaveSearch();

	const [saveSearchFieldText, setSaveSearchFieldText] = useState<string>('');

	useEffect(() => {
		setSaveSearchFieldText(title ? title : '');
	}, [title]);

	const toast = useToast();

	const handleEditOnClose = () => {
		// setSaveSearchFieldText(title ? title : '');
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
			filterSet: prepareSearchFilterSetRaw(searchTerms),
			id,
		})
			.then((results) => {
				const {
					data: {
						updateOrCreateSavedSearch: { id },
					},
				} = results;

				searchDispatch({
					type: 'SET_SAVED_SEARCH_FILTERS',
					payload: {
						filterSet: searchTerms,
						savedSearchId: id,
					},
				});
			})
			.then(() => {
				onClose();

				toast({
					title: 'Saved!',
					description: 'You can recall your saved searches later from the Search drawer.',
					position: 'bottom',
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
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
							isDisabled={saveLoading}
							isLoading={saveLoading}
						>
							Save
						</Button>
						<Button onClick={handleEditOnClose} colorScheme='red' isDisabled={saveLoading}>
							Cancel
						</Button>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
