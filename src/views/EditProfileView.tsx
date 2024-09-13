import { useContext, useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import {
	useMediaQuery,
	useColorMode,
	Box,
	Heading,
	Image,
	Flex,
	Text,
	Stack,
	Spinner,
	StackItem,
	Button,
	ButtonGroup,
	useToast,
	useDisclosure,
	Icon,
	SimpleGrid,
	Slide,
	As,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Card,
	Checkbox,
	Collapse,
	Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Formik, Form, Field, FieldInputProps, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
	FiFacebook,
	FiGlobe,
	FiLink,
	FiInstagram,
	FiLinkedin,
	FiMail,
	FiPhone,
	FiPlus,
	FiSave,
	FiArrowUpCircle,
	FiArrowDownCircle,
	FiHome,
	FiStar,
	FiVideo,
	FiUpload,
	FiUser,
	FiImage,
	FiTrash2,
} from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import XIcon from '@common/icons/X';
import { generateRandomString, sortCreditsByIndex } from '@lib/utils';
import { Credit, UserProfile } from '@lib/classes';
import useViewer from '@hooks/queries/useViewer';
import useUserTaxonomies from '@hooks/queries/useUserTaxonomies';
import useResumePreview from '@hooks/queries/useResumePreview';
import useUpdateProfile from '@hooks/mutations/useUpdateProfile';
import useDeleteCredit from '@hooks/mutations/useDeleteCredit';
import useFileUpload from '@hooks/mutations/useFileUpload';
import useClearProfileField from '@hooks/mutations/useClearProfileFileField';
import useUpdateCreditOrder from '@hooks/mutations/useUpdateCreditOrder';
import ProfileStackItem from '@common/ProfileStackItem';
import ProfileCheckboxGroup from '@common/inputs/ProfileCheckboxGroup';
import ProfileRadioGroup from '@common/inputs/ProfileRadioGroup';
import TextInput from '@common/inputs/TextInput';
import TextareaInput from '@common/inputs/TextareaInput';
import FileUploadButton from '@common/inputs/FileUploadButton';
import TooltipIconButton from '@common/inputs/TooltipIconButton';
import CreditItem from '@components/CreditItem';
import EditCreditModal from '@components/EditCreditModal';
import DeleteCreditButton from '@components/DeleteCreditButton';
import DisableProfileToggle from '@components/DisableProfileToggle';
import ResumePreviewModal from '@components/ResumePreviewModal';
import EditConflictDateRanges from '@components/EditConflictDateRanges';

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	email: Yup.string().email('Invalid email'),
	selfTitle: Yup.string().required('Title/Trade/Profession is required'),
	homebase: Yup.string().required('Home base is required'),
	locations: Yup.array().min(1, 'Please select at least one work location'),
	bio: Yup.string().max(500, 'Bio must be 500 characters or less'),
	phone: Yup.string().matches(/^[0-9+\-\s()]*$/, 'Invalid phone number format'),
	website: Yup.string().url('Invalid URL format'),
	socials: Yup.object().shape({
		instagram: Yup.string().matches(/^(@?[\w.]+)?$/, 'Invalid Instagram handle'),
		twitter: Yup.string().matches(/^(@?[\w]+)?$/, 'Invalid Twitter handle'),
		linkedin: Yup.string().url('Invalid LinkedIn URL').nullable(),
		facebook: Yup.string().url('Invalid Facebook URL').nullable(),
	}),
	imdb: Yup.string().url('Invalid IMDb URL'),
	willTravel: Yup.boolean(),
	willTour: Yup.boolean(),
	unions: Yup.array().of(Yup.string()),
	skills: Yup.array().of(Yup.string()),
	equipment: Yup.array().of(Yup.string()),
	/*
	 * Special fields:
	 */
	// image: Yup.string().url('Invalid URL'),
	// resume: Yup.string().url('Invalid resume URL'),
	// mediaImage1: Yup.string().url('Invalid URL'),
	// mediaImage2: Yup.string().url('Invalid URL'),
	// mediaImage3: Yup.string().url('Invalid URL'),
	// mediaImage4: Yup.string().url('Invalid URL'),
	// mediaImage5: Yup.string().url('Invalid URL'),
	// mediaImage6: Yup.string().url('Invalid URL'),
});

// TODO Refactor into smaller components.
// TODO Add cancel/navigation-away confirmation when exiting with edits

interface Props {
	profile: UserProfile | null;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The profile view.
 */
export default function EditProfileView({ profile }: Props): JSX.Element | null {
	const [{ loggedInId, loggedInSlug }] = useViewer();
	const { colorMode } = useColorMode();

	// Special fields.
	const {
		resume,
		image,
		mediaImage1,
		mediaImage2,
		mediaImage3,
		mediaImage4,
		mediaImage5,
		mediaImage6,
		credits,
	} = profile || {};

	// TODO implement exit intent dialog.

	const [fieldCurrentlyUploading, setFieldCurrentlyUploading] = useState<string>('');
	const [fieldCurrentlyClearing, setFieldCurrentlyClearing] = useState<string>('');

	const [resumePreview, setResumePreview] = useState('');

	const [editCredit, setEditCredit] = useState<Credit | null>(null);

	const [creditsSorted, setCreditsSorted] = useState<Credit[]>([]);
	const [hasEditedCreditOrder, setHasEditedCreditOrder] = useState<boolean>(false);

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const {
		uploadFileMutation,
		results: {
			data: { uploadFile: { fileUrl: uploadedResumePreview = '' as string } = {} } = {},
			loading: uploadFileMutationLoading,
		} = {},
	} = useFileUpload();

	const {
		clearProfileFieldMutation,
		results: { loading: clearProfileFieldMutationLoading },
	} = useClearProfileField();

	const { updateCreditOrderMutation } = useUpdateCreditOrder();

	const {
		deleteCreditMutation,
		results: { loading: deleteCreditLoading },
	} = useDeleteCredit();

	/**
	 * EditCredit Modal
	 */
	const {
		isOpen: creditModalIsOpen,
		onOpen: creditModalOnOpen,
		onClose: creditModalOnClose,
	} = useDisclosure();

	const { mediaItem } = useResumePreview(resume ? resume : '');
	const { sourceUrl: retrievedResumePreview } = mediaItem || '';

	useEffect(() => {
		// Remove resumePreview from state when the resume is removed.
		if (!resume) {
			setResumePreview('');
			return;
		}

		// Save the retrieved resumePreview to state when it is retrieved.
		if (retrievedResumePreview) {
			setResumePreview(retrievedResumePreview);
		} else if (uploadedResumePreview) {
			setResumePreview(uploadedResumePreview);
		}
	}, [resume, retrievedResumePreview]);

	// If the credits order has changed, fire the mutation to save it after a delay.
	useEffect(() => {
		if (!hasEditedCreditOrder) return;

		const timeout = setTimeout(() => {
			updateCreditOrderMutation(creditsSorted.map((credit) => credit.id))
				.then((result) => {
					// Reorder the creditsSorted array to match the ids in the array found in result.data.updateCreditOrder.creditIds
					const newOrder = result.data.updateCreditOrder.creditIds.map((id: string) =>
						creditsSorted.find((credit) => credit.id === id)
					);
					setCreditsSorted(newOrder);
					setHasEditedCreditOrder(false);
				})
				.catch((err) => console.error(err));
		}, 500);

		return () => {
			clearTimeout(timeout);
			setHasEditedCreditOrder(false);
		};
	}, [hasEditedCreditOrder]);

	// If we've got a new credit to edit, open the modal.
	useEffect(() => {
		if (!creditsSorted || !creditsSorted.length) return;

		// look for a credit in credits that has the isNew property set to true
		const newCredit = creditsSorted.find((credit) => credit.isNew);
		if (newCredit && newCredit.id !== editCredit?.id) {
			setEditCredit(newCredit);
			creditModalOnOpen();
		}

		return () => {
			setEditCredit(null);
		};
	}, [creditsSorted]);

	// Resort the credits on rerender.
	useEffect(() => {
		if (!credits) return;

		if (credits.length > 0) {
			// Remove credits with the isNew property set to true.
			const existingCredits = credits.filter((credit) => !credit.isNew);

			setCreditsSorted(sortCreditsByIndex(existingCredits));
		} else if (credits.length === 0) {
			setCreditsSorted([]);
		}

		return () => {
			setCreditsSorted([]);
		};
	}, [credits]);

	// Moves a credit index up by one
	const handleCreditMoveUp = (index: number) => {
		if (index === 0) return;

		const newOrder = [...creditsSorted];
		const temp = newOrder[index - 1];
		newOrder[index - 1] = newOrder[index];
		newOrder[index] = temp;
		setCreditsSorted(newOrder);
		setHasEditedCreditOrder(true);
	};

	// Moves a credit index down by one
	const handleCreditMoveDown = (index: number) => {
		if (index === creditsSorted.length - 1) return;

		const newOrder = [...creditsSorted];
		const temp = newOrder[index + 1];
		newOrder[index + 1] = newOrder[index];
		newOrder[index] = temp;
		setCreditsSorted(newOrder);
		setHasEditedCreditOrder(true);
	};

	// Get all the selectable terms for the user taxonomies.
	const [
		{
			locations: locationTerms,
			unions: unionTerms,
			partnerDirectories: partnerDirectoryTerms,
			experienceLevels: experienceLevelTerms,
			genderIdentities: genderIdentityTerms,
			personalIdentities: personalIdentityTerms,
			racialIdentities: racialIdentityTerms,
		},
	] = useUserTaxonomies();

	const { updateProfileMutation } = useUpdateProfile();

	const toast = useToast();
	const navigate = useNavigate();

	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event || !event.target || !event.target.files) return;

		const { name, files, accept } = event.target;

		const file = files[0];
		const maxSize = 2 * 1024 * 1024; // 2MB (adjust as necessary)

		// Check the file type
		if (accept && !accept.includes(file.type)) {
			toast({
				title: 'Invalid file type.',
				position: 'bottom',
				description: 'Please upload a valid file type.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});

			return;
		}

		// Limit the file size
		if (maxSize < file.size) {
			toast({
				title: 'File too large.',
				position: 'bottom',
				description: 'Please upload a file smaller than 2MB.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});

			return;
		}

		setFieldCurrentlyUploading(name);

		uploadFileMutation(file, name, loggedInId)
			.then(() => {
				setFieldCurrentlyUploading('');

				// success toast
				toast({
					title: 'Image uploaded!',
					position: 'bottom',
					description: 'Your image has been saved.',
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleFileUpload = (file: File, name: string) => {
		if (!file) return;

		const maxSize = 2 * 1024 * 1024; // 2MB (adjust as necessary)

		// // Limit the file size
		if (maxSize < file.size) {
			toast({
				title: 'File too large.',
				position: 'bottom',
				description: 'Please upload a file smaller than 2MB.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});

			return;
		}

		setFieldCurrentlyUploading(name);

		uploadFileMutation(file, name, loggedInId)
			.then(() => {
				setFieldCurrentlyUploading('');

				// success toast
				toast({
					title: 'Image uploaded!',
					position: 'bottom',
					description: 'Your image has been saved.',
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleFileInputClear = (event: MouseEvent<HTMLButtonElement>) => {
		const {
			dataset: { field: fieldName },
		} = event.currentTarget as HTMLButtonElement;

		if (!fieldName) return;

		setFieldCurrentlyClearing(fieldName);

		clearProfileFieldMutation(loggedInId, fieldName).then((result) => {
			const imageInputs = [
				image,
				mediaImage1,
				mediaImage2,
				mediaImage3,
				mediaImage4,
				mediaImage5,
				mediaImage6,
			];

			const description = imageInputs.includes(fieldName)
				? 'The image has been removed.'
				: 'The file has been removed.';

			// success toast
			toast({
				title: 'Success!',
				position: 'bottom',
				description,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});

			setFieldCurrentlyClearing('');
		});
	};

	const handleNewCredit = () => {
		setCreditsSorted([
			...creditsSorted,
			new Credit({
				id: generateRandomString(8),
				isNew: true,
				index: creditsSorted.length,
				positions: { departments: [], jobs: [] },
			}),
		]);
	};

	const handleDeleteCredit = (creditId: string) => {
		if (creditId !== '') {
			deleteCreditMutation(creditId, loggedInId)
				.then(() => {
					toast({
						title: 'Credit deleted.',
						// description: 'Your credit has been deleted.',
						status: 'success',
						duration: 3000,
						isClosable: true,
						position: 'bottom',
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const handleSubmit = async (
		values: UserProfile,
		{ setSubmitting }: FormikHelpers<UserProfile>
	) => {
		try {
			await updateProfileMutation(values);
			navigate(`/profile/${loggedInSlug}`);
			toast({
				title: 'Updated!',
				description: 'Your changes have been saved.',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
		} catch (err) {
			toast({
				title: 'Oops!',
				description: 'There was an error saving your profile: ' + err,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
		} finally {
			setSubmitting(false);
		}
	};

	const handleEditCredit = (creditId: string) => {
		const credit = creditsSorted.find((credit) => credit.id === creditId);
		if (!credit) return;

		setEditCredit(credit);
		creditModalOnOpen();
	};

	const handleCloseEditCredit = () => {
		setEditCredit(null);

		// If we're editing a new credit, but nothing has been filled out, delete it.
		if (editCredit && creditsSorted) {
			const credit = creditsSorted.find((credit) => credit.id === editCredit.id);

			if (credit && credit.isNew) {
				const updatedCredits = creditsSorted.filter((c) => c.id !== editCredit.id);
				setCreditsSorted(updatedCredits);
			}
		}

		creditModalOnClose();
	};

	const ClearFieldButton = ({
		field,
		icon = <FiTrash2 />,
		label,
		children,
		...props
	}: {
		field: string;
		icon?: JSX.Element;
		label: string;
		children?: JSX.Element | string;
		[prop: string]: any;
	}) => {
		if (!field) return null;

		return (
			<Button
				leftIcon={icon ? icon : undefined}
				size={'md'}
				colorScheme={'orange'}
				onClick={handleFileInputClear}
				aria-label={label}
				data-field={field}
				isLoading={clearProfileFieldMutationLoading && fieldCurrentlyClearing === field}
				{...props}
			>
				{children}
			</Button>
		);
	};

	const ProgressSpinner = () => (
		<Spinner thickness={'5px'} speed={'.8s'} color={'blue.500'} size={'xl'} />
	);

	const Sidebar = ({ ...props }: { [prop: string]: any }) => (
		<Box {...props}>
			<Box>
				<Heading variant={'contentTitle'} my={0}>
					Profile image
				</Heading>
				<Text fontSize={'sm'} m={0}>
					Portrait orientation works best. Max 2MB.
				</Text>
				<Box maxW={'300px'}>
					{uploadFileMutationLoading && fieldCurrentlyUploading === 'image' ? (
						// Uploading
						<Flex alignItems={'center'} justifyContent={'center'} h={'200px'}>
							<ProgressSpinner />
						</Flex>
					) : image ? (
						// Image set
						<>
							<Image
								src={image}
								alt={`Profile picture`}
								loading={'eager'}
								fit={'cover'}
								borderRadius={'md'}
							/>
							<ClearFieldButton field={'image'} label={'Remove image'} mt={2}>
								Remove
							</ClearFieldButton>
						</>
					) : (
						<FileDropzone
							fieldName={'image'}
							text={'Profile image'}
							icon={FiUser}
							h={'full'}
							iconProps={{ mb: 2, boxSize: '80px' }}
						/>
					)}
				</Box>
			</Box>
			<Card>
				<Box>
					<EditConflictDateRanges profile={profile} />
				</Box>
			</Card>
		</Box>
	);

	interface FileDropzoneProps {
		fieldName: string;
		text: string;
		icon?: As | null;
		allowPdf?: boolean;
		iconProps?: { [key: string]: any };
		[prop: string]: any;
	}

	const FileDropzone = ({
		fieldName,
		text,
		icon = FiUpload,
		allowPdf = false,
		iconProps,
		...props
	}: FileDropzoneProps) => {
		const [dragActive, setDragActive] = useState(false);

		// handle drag events
		const onDragOver = () => setDragActive(true);
		const onDragEnter = () => setDragActive(true);
		const onDragLeave = () => setDragActive(false);
		const onDrop = (acceptedFiles: File[]) => {
			setDragActive(false);
			if (acceptedFiles.length > 0) {
				handleFileUpload(acceptedFiles[0], fieldName);
			}
		};

		// React-Dropzone set-up and options
		const accept: { [key: string]: any } = {
			'image/jpeg': [],
			'image/png': [],
			'image/gif': [],
			'image/webp': [],
		};

		if (allowPdf) {
			accept['application/pdf'] = [];
		}

		const { getRootProps, getInputProps } = useDropzone({
			accept,
			onDrop,
			onDragLeave,
			onDragOver,
			onDragEnter,
		});

		const acceptString = allowPdf
			? 'JPG, PNG, GIF, WEBP, or PDF up to 2MB'
			: 'JPG, PNG, GIF, or WEBP up to 2MB';

		// imageData from context
		const imageData: { [key: string]: string | undefined } = {
			image,
			resume,
			mediaImage1,
			mediaImage2,
			mediaImage3,
			mediaImage4,
			mediaImage5,
			mediaImage6,
		};

		const currentImage = imageData[fieldName];

		return (
			<Box maxW={'100%'} p={0} borderRadius={'md'} {...props}>
				{currentImage ? (
					<>
						<Image
							src={currentImage}
							alt={text}
							loading={'eager'}
							fit={'cover'}
							w={'full'}
							borderRadius={'md'}
							mb={1}
						/>
						<Flex
							gap={2}
							flexWrap={{ base: 'wrap', sm: 'nowrap' }}
							justifyContent={'space-between'}
						>
							<FileUploadButton
								fieldName={fieldName}
								icon={<FiImage />}
								accept={'image/jpeg,image/png,image/gif,image/webp'}
								onChange={handleFileInputChange}
								loading={uploadFileMutationLoading || clearProfileFieldMutationLoading}
								flex={'1 0 48%'}
							>
								<Text>Replace</Text>
							</FileUploadButton>
							<ClearFieldButton field={fieldName} label={'Delete image'} flex={'1 0 48%'}>
								Delete
							</ClearFieldButton>
						</Flex>
					</>
				) : uploadFileMutationLoading && fieldCurrentlyUploading === fieldName ? (
					<Flex alignItems={'center'} justifyContent={'center'} padding={50}>
						<ProgressSpinner />
					</Flex>
				) : (
					<Flex
						{...getRootProps({ width: '100%' })}
						h={'100%'}
						w={'100%'}
						padding={5}
						flexDirection={'column'}
						alignItems={'center'}
						justifyContent={'center'}
						transition={'background-color 50ms ease'}
						cursor={'pointer'}
						borderWidth={'2px'}
						borderRadius={'md'}
						borderStyle={'dashed'}
						_light={{
							backgroundColor: dragActive ? 'blackAlpha.200' : 'blackAlpha.50',
							borderColor: 'blackAlpha.700',
						}}
						_dark={{
							backgroundColor: dragActive ? 'whiteAlpha.600' : 'blackAlpha.400',
							borderColor: 'text.light',
						}}
					>
						<Input {...getInputProps({ type: 'file' })} />
						{icon ? <Icon as={icon} boxSize={10} {...iconProps} /> : false}
						<Text textAlign={'center'}>Drag a file to upload, or click to choose.</Text>
						<Text fontSize={'xs'}>{acceptString}</Text>
					</Flex>
				)}
			</Box>
		);
	};

	const NewCreditButton = (): JSX.Element | null => {
		// Check if there's a new credit, and don't count it toward the limit.
		const newCredit = credits?.find((credit) => credit.isNew);
		const max = 5;
		const limit = newCredit ? max + 1 : max;

		return (
			<Button
				aria-label={'Add a new credit'}
				leftIcon={<FiPlus />}
				onClick={handleNewCredit}
				isDisabled={profile?.credits?.length === limit}
			>
				New Credit
			</Button>
		);
	};

	return profile ? (
		<Formik initialValues={profile} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{({ isValid, dirty, isSubmitting, values, errors, touched }) => (
				<Form id='edit-profile'>
					<Stack direction={'column'} flexWrap={'nowrap'} gap={4} position={'relative'}>
						<ProfileStackItem mt={4} mb={0}>
							<Accordion allowToggle>
								<AccordionItem>
									<Heading as={'h3'} m={0}>
										<AccordionButton>
											<Box as={'span'} fontWeight={'normal'}>
												Options
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</Heading>
									<AccordionPanel>
										<Flex justifyContent={'flex-start'} gap={4}>
											<Card py={2} my={0}>
												<DisableProfileToggle showHelperText showLabel />
											</Card>
										</Flex>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</ProfileStackItem>

						<ProfileStackItem>
							<Flex alignItems={'flex-start'} flexWrap={'wrap'} mt={2}>
								{isLargerThanMd ? (
									<Sidebar mb={2} width={'30%'} minWidth={'300px'} mr={4} />
								) : (
									false
								)}
								<Stack flex={'1'} px={{ base: 0, md: 4 }} w={'full'}>
									<ProfileStackItem title={'Name'}>
										<Flex alignItems={'flex-end'} gap={2} flexWrap={'wrap'} w={'full'}>
											<Field name='firstName'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														placeholder={'First'}
														label={'First name'}
														isRequired
														error={touched.firstName && errors.firstName}
														flex={'1'}
														minW={'200px'}
													/>
												)}
											</Field>
											<Field name='lastName'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														placeholder={'Last'}
														label={'Last name'}
														isRequired
														error={touched.lastName && errors.lastName}
														flex={'1'}
														minW={'200px'}
													/>
												)}
											</Field>
											<Field name='pronouns'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														label={'Pronouns'}
														maxW={'150px'}
														inputProps={{
															size: 'md',
															tabIndex: 0,
														}}
													/>
												)}
											</Field>
										</Flex>
									</ProfileStackItem>
									<ProfileStackItem title={'Profession'}>
										<Flex alignItems={'flex-start'} gap={2} flexWrap={'wrap'} w={'full'} mt={4}>
											<Field name='selfTitle'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														placeholder={'Title'}
														label={'Title/Trade/Profession'}
														isRequired
														leftElement={<Icon as={FiStar} />}
														maxLength={50}
														flex={'1 0 48%'}
														inputProps={{
															tabIndex: 0,
														}}
													/>
												)}
											</Field>
											<Field name='homebase'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														placeholder={'Home base'}
														label={'Where do you currently live?'}
														isRequired
														leftElement={<Icon as={FiHome} />}
														maxLength={25}
														flex={'1 0 48%'}
														inputProps={{
															tabIndex: 0,
														}}
													/>
												)}
											</Field>
										</Flex>
									</ProfileStackItem>

									{!isLargerThanMd ? (
										<ProfileStackItem display={'flex'} flexWrap={'wrap'} gap={4}>
											<Sidebar />
										</ProfileStackItem>
									) : (
										false
									)}

									<ProfileStackItem title={'Contact'}>
										<Stack direction={'column'}>
											<Field name='email'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														leftElement={<Icon as={FiMail} />}
														placeholder={'me@somewhere.com'}
														label={'Contact Email'}
														inputProps={{
															tabIndex: 0,
														}}
													/>
												)}
											</Field>
											{/* TODO Add checkbox for "use account email address" */}
											<Field name='phone'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														leftElement={<Icon as={FiPhone} />}
														placeholder={'(888) 888-8888'}
														label={'Phone'}
														inputProps={{
															tabIndex: 0,
														}}
													/>
												)}
											</Field>
											<Field name='website'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														leftElement={<Icon as={FiLink} />}
														label={'Website'}
														inputProps={{
															tabIndex: 0,
														}}
													/>
												)}
											</Field>
										</Stack>
									</ProfileStackItem>

									<ProfileStackItem title={'Additional Languages'} w={'full'} maxW={'3xl'} mt={4}>
										<>
											<Field name='multilingual'>
												{({ field }: { field: FieldInputProps<boolean> }) => {
													// Destructure 'value' from field to exclude it
													const { value, ...fieldWithoutValue } = field;

													return (
														<Checkbox
															{...fieldWithoutValue}
															isChecked={field.value}
															onChange={(e) => field.onChange(e)}
															variant={'buttonStyle'}
															position={'relative'}
														>
															I speak more than one language
														</Checkbox>
													);
												}}
											</Field>
											<Field name='languages'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<Collapse in={!!values.multilingual}>
														<TextInput
															{...field}
															leftElement={<Icon as={FiGlobe} />}
															label={'What languages other than English do you speak?'}
															placeholder={'Spanish, Italian, Esperanto...'}
															error={touched.languages && errors.languages}
															mt={2}
														/>
													</Collapse>
												)}
											</Field>
										</>
									</ProfileStackItem>
									<ProfileStackItem title={'Social'} w={'full'} maxW={'3xl'} mt={4}>
										<SimpleGrid columns={[1, 2]} spacing={4}>
											<Field name='socials.linkedin'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														leftElement={<Icon as={FiLinkedin} />}
														label={'LinkedIn URL'}
														placeholder={'https://linkedin/in/yourprofile'}
													/>
												)}
											</Field>
											<Field name='socials.facebook'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														leftElement={<Icon as={FiFacebook} />}
														label={'Facebook URL'}
														placeholder={'https://facebook.com/yourname'}
													/>
												)}
											</Field>
											<Field name='socials.instagram'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														leftElement={<Icon as={FiInstagram} />}
														label={'Instagram @handle'}
														placeholder={'@handle'}
													/>
												)}
											</Field>
											<Field name='socials.twitter'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														leftElement={<XIcon />}
														label={'X/Twitter @handle'}
														placeholder={'@handle'}
													/>
												)}
											</Field>
										</SimpleGrid>
									</ProfileStackItem>
								</Stack>
							</Flex>
						</ProfileStackItem>

						<ProfileStackItem title={'Work Locations'} fontSize={'sm'}>
							<>
								<Heading variant={'contentSubtitle'}>
									Select any areas in which you're a local hire.
								</Heading>
								<Field name='locations'>
									{({
										field,
										form,
									}: {
										field: FieldInputProps<string[]>;
										form: FormikProps<any>;
									}) => {
										return (
											<ProfileCheckboxGroup
												isRequired
												items={locationTerms}
												checked={
													field.value ? field.value.map((item: string) => item.toString()) : []
												}
												handleChange={(value: string[]) => form.setFieldValue('locations', value)}
											/>
										);
									}}
								</Field>
							</>
						</ProfileStackItem>

						<ProfileStackItem py={4} display={'flex'} gap={10}>
							<Flex flexWrap={'wrap'} gap={8} justifyContent={'space-between'}>
								<Box>
									<Heading variant={'contentTitle'}>Travel</Heading>
									<Heading variant={'contentSubtitle'}>Would you work away from home?</Heading>
									<Field name='willTravel'>
										{({
											field,
											form,
										}: {
											field: FieldInputProps<string>;
											form: FormikProps<UserProfile>;
										}) => (
											<ProfileRadioGroup
												{...field}
												items={[
													{ label: 'Yes', value: 'true' },
													{ label: 'No', value: 'false' },
												]}
												defaultValue={field.value.toString()}
												handleChange={(value: string) =>
													form.setFieldValue(field.name, value === 'true')
												}
											/>
										)}
									</Field>
								</Box>
								<Box>
									<Heading variant={'contentTitle'}>Tour</Heading>
									<Heading variant={'contentSubtitle'}>Would you go on tour?</Heading>
									<Field name='willTour'>
										{({
											field,
											form,
										}: {
											field: FieldInputProps<string>;
											form: FormikProps<UserProfile>;
										}) => {
											return (
												<ProfileRadioGroup
													{...field}
													items={[
														{ label: 'Yes', value: 'true' },
														{ label: 'No', value: 'false' },
													]}
													defaultValue={field.value.toString()}
													handleChange={(value: string) =>
														form.setFieldValue(field.name, value === 'true')
													}
												/>
											);
										}}
									</Field>
								</Box>
								<Box>
									<Heading
										variant={'contentTitle'}
										flex={'0 0 100%'}
										textAlign={'left'}
										alignItems={'center'}
										display={'flex'}
									>
										Resume
									</Heading>
									<Field name='resume'>
										{({
											field,
											form,
										}: {
											field: FieldInputProps<string>;
											form: FormikProps<any>;
										}) => (
											<>
												{!field.value && (
													<Heading variant={'contentSubtitle'}>PDF or image</Heading>
												)}
												{field.value && resumePreview ? (
													<Flex flexWrap={'wrap'}>
														<ResumePreviewModal
															resumePreview={resumePreview}
															resumeLink={field.value}
															w={'100%'}
															maxW={'300px'}
															mr={{ base: 0, sm: 1 }}
															mb={{ base: 1, sm: 0 }}
														/>
														<ClearFieldButton field={'resume'} label={'Delete resume'}>
															Clear
														</ClearFieldButton>
													</Flex>
												) : (
													<FileDropzone fieldName={'resume'} text={'Resume'} allowPdf={true} />
												)}
											</>
										)}
									</Field>
								</Box>
							</Flex>
						</ProfileStackItem>

						<ProfileStackItem>
							<Stack display={'flex'} gap={4}>
								<ProfileStackItem title={'Unions/Guilds/Memberships'}>
									<Field name='unions'>
										{({
											field,
											form,
										}: {
											field: FieldInputProps<string[]>;
											form: FormikProps<any>;
										}) => (
											<>
												<Heading variant={'contentSubtitle'}>
													What unions or guilds are you a member of?
												</Heading>
												<Box fontSize={'sm'}>
													<ProfileCheckboxGroup
														items={unionTerms}
														checked={field.value ? field.value.map((item) => item.toString()) : []}
														handleChange={(value: string[]) => form.setFieldValue('unions', value)}
													/>
												</Box>
											</>
										)}
									</Field>
								</ProfileStackItem>
								<ProfileStackItem title={'Experience Levels'}>
									<Field name='experienceLevels'>
										{({
											field,
											form,
										}: {
											field: FieldInputProps<string[]>;
											form: FormikProps<any>;
										}) => (
											<>
												<Heading variant={'contentSubtitle'}>
													At what levels have you worked?
												</Heading>
												<Box fontSize={'sm'}>
													<ProfileCheckboxGroup
														items={experienceLevelTerms}
														checked={field.value ? field.value.map((item) => item.toString()) : []}
														handleChange={(value: string[]) =>
															form.setFieldValue('experienceLevels', value)
														}
													/>
												</Box>
											</>
										)}
									</Field>
								</ProfileStackItem>
								<ProfileStackItem title={'Partner Directories'}>
									<Field name='partnerDirectories'>
										{({
											field,
											form,
										}: {
											field: FieldInputProps<string[]>;
											form: FormikProps<any>;
										}) => (
											<>
												<Heading variant={'contentSubtitle'}>
													Are you a member of one of our partner organizations?
												</Heading>
												<Box fontSize={'sm'}>
													<ProfileCheckboxGroup
														items={partnerDirectoryTerms}
														checked={field.value ? field.value.map((item) => item.toString()) : []}
														handleChange={(value: string[]) =>
															form.setFieldValue('partnerDirectories', value)
														}
													/>
												</Box>
											</>
										)}
									</Field>
								</ProfileStackItem>
							</Stack>
						</ProfileStackItem>

						<ProfileStackItem
							title={'Credits'}
							centerlineColor={'brand.blue'}
							pos={'relative'}
							id={'credits'}
						>
							<>
								<Text fontSize={'lg'}>
									Add your 5 best credits here.{' '}
									<Text as={'span'} fontStyle={'italic'}>
										You must have at least one credit to be listed in searches!
									</Text>
								</Text>

								<NewCreditButton />

								{/* TODO better reorder and delete animations */}

								{deleteCreditLoading ? (
									<Spinner size={'sm'} colorScheme={'green'} />
								) : (
									creditsSorted.map((credit: Credit, index: number) => (
										<Stack key={credit.id} direction={'row'} alignItems={'center'}>
											<CreditItem
												credit={credit}
												onClick={() => handleEditCredit(credit.id)}
												isEditable
												key={index}
												width={'full'}
											/>
											<Stack
												as={isLargerThanMd ? ButtonGroup : undefined}
												gap={{ base: 2, md: 0 }}
												direction={{ base: 'column', md: 'row' }}
											>
												<TooltipIconButton
													colorScheme={'gray'}
													icon={<FiArrowUpCircle />}
													label={'Move Credit up'}
													isDisabled={index === 0}
													id={credit.id}
													onClick={() => {
														handleCreditMoveUp(index);
													}}
												/>
												<TooltipIconButton
													colorScheme={'gray'}
													icon={<FiArrowDownCircle />}
													label={'Move Credit down'}
													isDisabled={index === creditsSorted.length - 1}
													id={credit.id}
													onClick={() => {
														handleCreditMoveDown(index);
													}}
												/>
												<DeleteCreditButton
													handleDeleteCredit={handleDeleteCredit}
													id={credit.id}
												/>
											</Stack>
										</Stack>
									))
								)}

								<EditCreditModal
									isOpen={creditModalIsOpen}
									onClose={handleCloseEditCredit}
									credit={creditsSorted?.find((credit) => credit.id === editCredit?.id) ?? null}
								/>
							</>
						</ProfileStackItem>

						<ProfileStackItem title={'About'} centerlineColor={'brand.orange'}>
							<Field name='description'>
								{({ field }: { field: FieldInputProps<string> }) => (
									<>
										<Heading variant={'contentTitle'}>Bio</Heading>
										<Text my={2} fontSize={'lg'}>
											Write a little. Write a lot. It's up to you!
										</Text>
										<TextareaInput
											{...field}
											label={'Bio'}
											labelHidden
											mt={2}
											mb={4}
											inputProps={{
												rows: 10,
											}}
										/>
									</>
								)}
							</Field>
						</ProfileStackItem>

						<ProfileStackItem title={'Identity'} centerlineColor={'brand.yellow'}>
							<>
								<Text fontSize={'lg'}>
									The following optional fields will be <strong>searchable</strong>, but{' '}
									<em>will not appear</em> on your public profile. Select any that apply.
								</Text>
								<Stack direction={'row'} mt={4} gap={2} flexWrap={'wrap'}>
									<ProfileStackItem title={'Gender'} flex={'1 0 33%'}>
										<Field name='genderIdentities'>
											{({
												field,
												form,
											}: {
												field: FieldInputProps<number[]>;
												form: FormikProps<UserProfile>;
											}) => (
												<ProfileCheckboxGroup
													items={genderIdentityTerms}
													checked={field.value.map((item) => item.toString())}
													handleChange={(value: string[]) =>
														form.setFieldValue('genderIdentities', value)
													}
												/>
											)}
										</Field>
									</ProfileStackItem>
									<ProfileStackItem title={'Race/Ethnicity'} flex={'1 0 33%'}>
										<Field name='racialIdentities'>
											{({ field }: { field: FieldInputProps<number[]> }) => (
												<ProfileCheckboxGroup
													items={racialIdentityTerms}
													checked={field.value.map((item) => item.toString())}
													handleChange={(value: string[]) => {
														field.onChange({
															target: {
																name: field.name,
																value: value.map(Number),
															},
														});
													}}
												/>
											)}
										</Field>
									</ProfileStackItem>
									<ProfileStackItem title={'Additional'} flex={'1 0 33%'}>
										<Field name='personalIdentities'>
											{({ field }: { field: FieldInputProps<number[]> }) => (
												<ProfileCheckboxGroup
													items={personalIdentityTerms}
													checked={field.value.map((item) => item.toString())}
													handleChange={(value: string[]) => {
														field.onChange({
															target: {
																name: field.name,
																value: value.map(Number),
															},
														});
													}}
												/>
											)}
										</Field>
									</ProfileStackItem>
								</Stack>
							</>
						</ProfileStackItem>

						<ProfileStackItem title={'Education + Training'} centerlineColor={'brand.green'}>
							<Field name='education'>
								{({ field }: { field: FieldInputProps<string> }) => (
									<TextareaInput
										{...field}
										variant={'outline'}
										label={'Education and training'}
										labelHidden
										inputProps={{
											rows: 4,
										}}
									/>
								)}
							</Field>
						</ProfileStackItem>

						<ProfileStackItem title={'Media'} centerlineColor={'brand.blue'}>
							<>
								<Heading variant={'contentSubtitle'}>
									Showcase your work with images and videos.
								</Heading>
								<Box>
									<Heading variant={'contentTitle'}>Videos</Heading>
									<SimpleGrid columns={[1, 2]} spacing={8}>
										<Box>
											<Field name='mediaVideo1'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														label={'Video embed 1'}
														placeholder={'https://www.youtube.com/watch?v=M67E9mpwBpM'}
														leftElement={<FiVideo />}
													/>
												)}
											</Field>
											{values.mediaVideo1 ? (
												<Box position={'relative'} paddingBottom={'56.25%'} w={'full'}>
													<Box
														position={'absolute'}
														top={0}
														left={0}
														width={'100%'}
														height={'100%'}
													>
														<ReactPlayer
															url={values.mediaVideo1}
															controls
															width={'100%'}
															height={'100%'}
														/>
													</Box>
												</Box>
											) : (
												false
											)}
										</Box>
										<Box>
											<Field name='mediaVideo2'>
												{({ field }: { field: FieldInputProps<string> }) => (
													<TextInput
														{...field}
														label={'Video embed 2'}
														placeholder={'https://www.youtube.com/watch?v=eR8YUj3C9lI'}
														leftElement={<FiVideo />}
													/>
												)}
											</Field>
											{values.mediaVideo2 ? (
												<Box position={'relative'} paddingBottom={'56.25%'} w={'full'}>
													<Box
														position={'absolute'}
														top={0}
														left={0}
														width={'100%'}
														height={'100%'}
													>
														<ReactPlayer
															url={values.mediaVideo2}
															controls
															width={'100%'}
															height={'100%'}
														/>
													</Box>
												</Box>
											) : (
												false
											)}
										</Box>
									</SimpleGrid>
								</Box>
								<Box mt={6}>
									<Heading variant={'contentTitle'}>Images</Heading>
									<Text fontSize={'lg'} mb={0}>
										Allowed formats: jpg, png, gif, heic, or webp. 2MB or less, please.
									</Text>
									<Text variant={'notice'} fontSize={'sm'} fontStyle={'italic'} mb={4}>
										* By uploading images to your RISE profile, you acknowledge that you own the
										rights or are authorized to use these images as work samples.
									</Text>
									<SimpleGrid columns={[1, 2, 3]} spacing={8}>
										<FileDropzone fieldName={'mediaImage1'} text={'Image 1'} />
										<FileDropzone fieldName={'mediaImage2'} text={'Image 2'} />
										<FileDropzone fieldName={'mediaImage3'} text={'Image 3'} />
										<FileDropzone fieldName={'mediaImage4'} text={'Image 4'} />
										<FileDropzone fieldName={'mediaImage5'} text={'Image 5'} />
										<FileDropzone fieldName={'mediaImage6'} text={'Image 6'} />
									</SimpleGrid>
								</Box>
							</>
						</ProfileStackItem>
					</Stack>

					<Slide
						in={dirty}
						direction={'bottom'}
						style={{
							position: 'fixed',
							bottom: 0,
							left: 0,
							width: 'full',
							backgroundColor: colorMode === 'dark' ? 'white' : '#222',
							borderTopWidth: '1px',
							borderTopColor: 'gray.100',
							textAlign: 'right',
							zIndex: 3,
						}}
					>
						<Button
							type={'submit'}
							leftIcon={isSubmitting ? undefined : <FiSave />}
							aria-label={'Save changes'}
							colorScheme={'green'}
							// isDisabled={!isValid || !dirty || isSubmitting}
							isLoading={isSubmitting}
							size={'lg'}
							mr={4}
							my={2}
						>
							Save Changes
						</Button>
					</Slide>
				</Form>
			)}
		</Formik>
	) : null;
}
