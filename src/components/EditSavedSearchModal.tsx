import { useContext, useRef } from 'react';
import {
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Button,
	Text,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldInputProps, FormikProps } from 'formik';
import * as Yup from 'yup';
import { SearchFilterSet } from '@lib/classes';
import { SearchContext } from '@context/SearchContext';
import useSaveSearch from '@mutations/useSaveSearch';
import useViewer from '@queries/useViewer';
import TextInput from '@common/inputs/TextInput';

interface Props {
	id: number;
	title: string;
	searchTerms: SearchFilterSet;
	isOpen: boolean;
	onClose: () => void;
}

export default function EditSavedSearchModal({ id, title, searchTerms, isOpen, onClose }: Props) {
	const [{ loggedInId }] = useViewer();
	const { searchDispatch } = useContext(SearchContext);
	const initialSaveModalRef = useRef(null);
	const { saveSearchMutation } = useSaveSearch();

	const toast = useToast();

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Title is required'),
	});

	const handleSubmit = (values: { title: string }) => {
		saveSearchMutation({
			userId: loggedInId,
			title: values.title,
			filterSet: searchTerms.toQueryableFilterSet(),
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
					description: 'This search has been saved for later.',
					position: 'bottom',
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
			});
	};

	const handleEditOnClose = () => {
		onClose();
	};

	return (
		<Modal initialFocusRef={initialSaveModalRef} isOpen={isOpen} onClose={handleEditOnClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader pb={2}>{!!title ? 'Rename this search' : 'Save this search'}</ModalHeader>
				<ModalCloseButton />

				<ModalBody pb={6}>
					<Text fontSize={'sm'} mt={0}>
						Give this search a short, descriptive name to easily run it again.
					</Text>

					<Formik
						initialValues={{ title: title || '' }}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ isSubmitting }) => (
							<Form>
								<Field name='title'>
									{({
										field,
										form,
									}: {
										field: FieldInputProps<string>;
										form: FormikProps<{ title: string }>;
									}) => (
										<TextInput
											{...field}
											label={'Title'}
											placeholder={'My search'}
											ref={initialSaveModalRef}
											error={form.errors.title && form.touched.title}
										/>
									)}
								</Field>
								<Button
									colorScheme={'blue'}
									mr={3}
									type={'submit'}
									isDisabled={isSubmitting}
									isLoading={isSubmitting}
								>
									Save
								</Button>
								<Button onClick={handleEditOnClose} colorScheme={'red'} isDisabled={isSubmitting}>
									Cancel
								</Button>
							</Form>
						)}
					</Formik>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
