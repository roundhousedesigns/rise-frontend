import { useContext, useState, useEffect, useRef, ChangeEvent, MouseEvent, FormEvent } from 'react';
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
	IconButton,
	Button,
	ButtonGroup,
	useToast,
	useDisclosure,
	Icon,
	SimpleGrid,
	Slide,
	Input,
	As,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Card,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {
	FiFacebook,
	FiGlobe,
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
import { sortCreditsByIndex } from '@lib/utils';
import { Credit, UserProfile } from '@lib/classes';
import { EditProfileContext } from '@context/EditProfileContext';
import { useProfileEdited } from '@hooks/hooks';
import useViewer from '@hooks/queries/useViewer';
import useUserTaxonomies from '@hooks/queries/useUserTaxonomies';
import useResumePreview from '@hooks/queries/useResumePreview';
import useUpdateProfile from '@hooks/mutations/useUpdateProfile';
import useDeleteCredit from '@hooks/mutations/useDeleteCredit';
import useFileUpload from '@hooks/mutations/useFileUpload';
import useClearProfileField from '@hooks/mutations/useClearProfileFileField';
import useUpdateCreditOrder from '@hooks/mutations/useUpdateCreditOrder';
import ProfileCheckboxGroup from '@common/ProfileCheckboxGroup';
import ProfileRadioGroup from '@common/ProfileRadioGroup';
import TextInput from '@common/inputs/TextInput';
import TextareaInput from '@common/inputs/TextareaInput';
import FileUploadButton from '@common/inputs/FileUploadButton';
import ResumePreviewModal from '@common/ResumePreviewModal';
import ProfileStackItem from '@common/ProfileStackItem';
import CreditItem from '@components/CreditItem';
import EditCreditModal from '@components/EditCreditModal';
import DeleteCreditButton from '@components/DeleteCreditButton';
import DisableProfileToggle from '@components/DisableProfileToggle';
import LookingForWorkToggle from '@components/LookingForWorkToggle';
import IsOrgToggle from '@components/IsOrgToggle';
import { getLabels } from '@/lib/profileLabelMappings';

// TODO Add cancel/navigation-away confirmation when exiting with edits

interface Props {
	profile: UserProfile | null;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The profile view.
 */
export default function EditProfileView({ profile }: Props): JSX.Element | null {
	const { editProfile, editProfileDispatch } = useContext(EditProfileContext);
	const { loggedInId, loggedInSlug, isOrg } = useViewer();
	const { colorMode } = useColorMode();

	const {
		firstName,
		lastName,
		pronouns,
		selfTitle,
		image,
		homebase,
		website,
		socials,
		locations,
		education,
		willTravel,
		willTour,
		description,
		credits,
		email,
		resume,
		phone,
		unions,
		partnerDirectories,
		experienceLevels,
		genderIdentities,
		racialIdentities,
		personalIdentities,
		mediaVideo1,
		mediaVideo2,
		mediaImage1,
		mediaImage2,
		mediaImage3,
		mediaImage4,
		mediaImage5,
		mediaImage6,
	} = editProfile || {};

	// TODO implement edited alert dialog on exit and on save button enable/disable
	const originalProfile = useRef<UserProfile | null>(null);

	const [fieldCurrentlyUploading, setFieldCurrentlyUploading] = useState<string>('');
	const [fieldCurrentlyClearing, setFieldCurrentlyClearing] = useState<string>('');

	const [resumePreview, setResumePreview] = useState('');

	const [editCredit, setEditCredit] = useState<string>('');
	const editCreditId = useRef<string>('');

	const [creditsSorted, setCreditsSorted] = useState<Credit[]>([]);
	const [hasEditedCreditOrder, setHasEditedCreditOrder] = useState<boolean>(false);

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const labels = getLabels(isOrg);

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

	const hasEditedProfile = useProfileEdited(editProfile, originalProfile.current);

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

	// Set the original profile to the current profile when it is loaded.
	useEffect(() => {
		if (!editProfile || originalProfile.current) return;

		originalProfile.current = editProfile;
	}, [editProfile]);

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
		if (!credits || !credits.length) return;

		// look for a credit in credits that has a the isNew property set to true
		const newCredit = credits.find((credit) => credit.isNew);
		if (newCredit && newCredit.id !== editCreditId.current) {
			setEditCredit(newCredit.id);
			creditModalOnOpen();
		}

		return () => {
			setEditCredit('');
		};
	}, [credits]);

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

	const {
		updateProfileMutation,
		results: { loading: saveLoading },
	} = useUpdateProfile();

	const toast = useToast();
	const navigate = useNavigate();

	// Set context on load, and update it when the profile changes.
	useEffect(() => {
		if (profile) {
			editProfileDispatch({ type: 'INIT', payload: { profile } });
		}
	}, [profile]);

	const handleCheckboxInput = (name: string) => (newValue: any) => {
		editProfileDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value: newValue,
			},
		});
	};

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		editProfileDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value,
			},
		});
	};

	const handleSocialInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const field = name.split('.')[1];

		editProfileDispatch({
			type: 'UPDATE_PERSONAL_LINKS_INPUT',
			payload: {
				name: field,
				value,
			},
		});
	};

	const handleRadioInputChange = (name: string) => (newValue: string) => {
		editProfileDispatch({
			type: 'UPDATE_BOOLEAN_INPUT',
			payload: {
				name,
				value: newValue,
			},
		});
	};

	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event || !event.target || !event.target.files) return;

		const { name, files, accept } = event.target;

		const file = files[0];
		const maxSize = 2 * 1024 * 1024; // 2MB (adjust as necessary)

		// Check the file type
		if (accept && !accept.includes(file.type)) {
			toast({
				title: 'Invalid file type.',
				position: 'top',
				description: 'Please upload a valid file type.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			return;
		}

		// Limit the file size
		if (maxSize < file.size) {
			toast({
				title: 'File too large.',
				position: 'top',
				description: 'Please upload a file smaller than 2MB.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			return;
		}

		setFieldCurrentlyUploading(name);

		uploadFileMutation(file, name, loggedInId)
			.then((result) => {
				editProfileDispatch({
					type: 'UPDATE_INPUT',
					payload: {
						name,
						value: result.data.uploadFile.fileUrl,
					},
				});

				setFieldCurrentlyUploading('');

				// success toast
				toast({
					title: 'Image uploaded!',
					position: 'top',
					description: 'Your image has been saved.',
					status: 'success',
					duration: 5000,
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
				position: 'top',
				description: 'Please upload a file smaller than 2MB.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			return;
		}

		setFieldCurrentlyUploading(name);

		uploadFileMutation(file, name, loggedInId)
			.then((result) => {
				editProfileDispatch({
					type: 'UPDATE_INPUT',
					payload: {
						name,
						value: result.data.uploadFile.fileUrl,
					},
				});

				setFieldCurrentlyUploading('');

				// success toast
				toast({
					title: 'Image uploaded!',
					position: 'top',
					description: 'Your image has been saved.',
					status: 'success',
					duration: 5000,
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
				position: 'top',
				description,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});

			editProfileDispatch({
				type: 'UPDATE_INPUT',
				payload: {
					name: fieldName,
					value: '',
				},
			});

			setFieldCurrentlyClearing('');
		});
	};

	const handleNewCredit = () => {
		editProfileDispatch({
			type: 'ADD_NEW_CREDIT',
			payload: {},
		});
	};

	const handleDeleteCredit = (creditId: string) => {
		if (creditId !== '') {
			deleteCreditMutation(creditId, loggedInId)
				.then(() => {
					toast({
						title: 'Credit deleted.',
						// description: 'Your credit has been deleted.',
						status: 'success',
						duration: 5000,
						isClosable: true,
						position: 'top',
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Manual required field validation
		if (!Boolean(locations.length)) {
			toast({
				title: 'Missing required field.',
				description: 'Please select at least one work location.',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top',
			});

			return;
		}

		updateProfileMutation(editProfile)
			.then(() => {
				navigate(`/profile/${loggedInSlug}`);
			})
			.then(() => {
				toast({
					title: 'Saved!',
					description: 'Your profile has been updated.',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'top',
				});
			})
			.catch((err) => {
				toast({
					title: 'Oops!',
					description: 'There was an error saving your profile: ' + err,
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'top',
				});
			});
	};

	const handleEditCredit = (creditId: string) => {
		setEditCredit(creditId);
		creditModalOnOpen();
	};

	const handleCloseEditCredit = () => {
		editCreditId.current = '';

		// If we're editing a new credit, but nothing has been filled out, delete it.
		if (editCredit && credits) {
			const credit = credits.find((credit) => credit.id === editCredit);
			if (credit && credit.isNew) {
				editProfileDispatch({
					type: 'DELETE_CREDIT',
					payload: {
						creditId: editCredit,
					},
				});
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
				size='md'
				colorScheme='orange'
				onClick={handleFileInputClear}
				aria-label={label}
				data-field={field}
				{...props}
			>
				{clearProfileFieldMutationLoading && fieldCurrentlyClearing === field ? (
					<Spinner />
				) : (
					children
				)}
			</Button>
		);
	};

	const ProgressSpinner = () => <Spinner thickness='5px' speed='.8s' color='blue.500' size='xl' />;

	const ProfileImageUploader = ({ ...props }: { [prop: string]: string }) => (
		<Stack mb={2} width='30%' minWidth='300px' {...props}>
			<Heading variant='contentTitle' my={0}>
				Profile image
			</Heading>
			<Text fontSize='sm' m={0}>
				Portrait orientation works best. Max 2MB.
			</Text>
			{uploadFileMutationLoading && fieldCurrentlyUploading === 'image' ? (
				// Uploading
				<Flex alignItems='center' justifyContent='center' h='200px'>
					<ProgressSpinner />
				</Flex>
			) : image ? (
				// Image set
				<>
					<Image
						src={image}
						alt={`Profile picture`}
						loading='eager'
						fit='cover'
						borderRadius='md'
						w='full'
					/>
					<ClearFieldButton field='image' label='Remove image' mt={2}>
						Remove
					</ClearFieldButton>
				</>
			) : (
				<FileDropzone
					fieldName='image'
					text='Profile image'
					icon={FiUser}
					h='full'
					iconProps={{ mb: 2, boxSize: '80px' }}
				/>
			)}
		</Stack>
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
			handleFileUpload(acceptedFiles[0], fieldName);
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
			<Box maxW={'100%'} p={0} borderRadius='md' {...props}>
				{currentImage ? (
					<>
						<Image
							src={currentImage}
							alt={text}
							loading='eager'
							fit='cover'
							w='full'
							borderRadius='md'
							mb={1}
						/>
						<Flex gap={2} flexWrap={{ base: 'wrap', sm: 'nowrap' }} justifyContent='space-between'>
							<FileUploadButton
								fieldName={fieldName}
								icon={<FiImage />}
								accept='image/jpeg,image/png,image/gif,image/webp'
								onChange={handleFileInputChange}
								loading={uploadFileMutationLoading || clearProfileFieldMutationLoading}
								flex='1 0 48%'
							>
								<Text>Replace</Text>
							</FileUploadButton>
							<ClearFieldButton field={fieldName} label='Delete image' flex='1 0 48%'>
								Delete
							</ClearFieldButton>
						</Flex>
					</>
				) : uploadFileMutationLoading && fieldCurrentlyUploading === fieldName ? (
					<Flex alignItems='center' justifyContent='center' padding={50}>
						<ProgressSpinner />
					</Flex>
				) : (
					<Flex
						{...getRootProps({ width: '100%' })}
						h='100%'
						w='100%'
						padding={5}
						flexDirection='column'
						alignItems='center'
						justifyContent='center'
						transition='background-color 50ms ease'
						cursor='pointer'
						borderWidth='2px'
						borderRadius='md'
						borderStyle='dashed'
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
						<Text textAlign='center'>Drag a file to upload, or click to choose.</Text>
						<Text fontSize='xs'>{acceptString}</Text>
					</Flex>
				)}
			</Box>
		);
	};

	const NewCreditButton = (): JSX.Element | null => {
		// Check if there's a new credit, and don't count it toward the limit.
		const newCredit = credits.find((credit) => credit.isNew);
		const max = 5;
		const limit = newCredit ? max + 1 : max;

		return (
			<Button
				aria-label='Add a new credit'
				leftIcon={<FiPlus />}
				onClick={handleNewCredit}
				isDisabled={editProfile.credits?.length === limit}
			>
				New Credit
			</Button>
		);
	};

	return editProfile ? (
		<form id='edit-profile' onSubmit={handleSubmit}>
			<Stack direction='column' flexWrap='nowrap' gap={4} position='relative'>
				<ProfileStackItem mt={4} mb={0}>
					<Accordion allowToggle defaultIndex={0}>
						<AccordionItem>
							<Heading as='h3' m={0}>
								<AccordionButton>
									<Box as='span' fontWeight='normal'>
										Quick Actions
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</Heading>
							<AccordionPanel>
								<Flex justifyContent='flex-start' gap={4}>
									<Card py={2} my={0}>
										<DisableProfileToggle showHelperText showLabel />
									</Card>
									<Card py={2} my={0}>
										<LookingForWorkToggle showHelperText showLabel />
									</Card>
									<Card py={2} my={0}>
										<IsOrgToggle showHelperText showLabel />
									</Card>
								</Flex>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</ProfileStackItem>

				<ProfileStackItem>
					<Flex alignItems='flex-start' flexWrap='wrap' mt={2}>
						{isLargerThanMd ? <ProfileImageUploader /> : false}
						<Stack flex='1' px={{ base: 0, md: 4 }} w='full'>
							<ProfileStackItem title='Name'>
								<Flex alignItems='flex-end' gap={2} flexWrap='wrap' w='full'>
									{isOrg ? (
										false
									) : (
										<TextInput
											placeholder='First'
											value={firstName}
											name='firstName'
											isRequired
											onChange={handleInputChange}
											flex='1'
											label='First name'
											minW='200px'
										/>
									)}
									<TextInput
										placeholder={labels.lastNamePlaceholder}
										value={lastName}
										name='lastName'
										isRequired
										label={labels.lastName}
										onChange={handleInputChange}
										flex='1'
										minW='200px'
									/>
									{isOrg ? (
										false
									) : (
										<TextInput
											value={pronouns}
											name='pronouns'
											label='Pronouns'
											onChange={handleInputChange}
											maxW='150px'
											inputProps={{
												size: 'md',
												tabIndex: 0,
											}}
										/>
									)}
								</Flex>
							</ProfileStackItem>
							<ProfileStackItem title={labels.profession}>
								<Flex alignItems='flex-start' gap={2} flexWrap='wrap' w='full' mt={4}>
									<TextInput
										value={selfTitle}
										name='selfTitle'
										placeholder={labels.titleTradeProfessionPlaceholder}
										label={labels.titleTradeProfession}
										leftElement={<Icon as={FiStar} />}
										onChange={handleInputChange}
										maxLength={50}
										flex='1 0 48%'
										inputProps={{
											tabIndex: 0,
										}}
									/>
									<TextInput
										placeholder='Home base'
										value={homebase}
										name='homebase'
										label={labels.homebase}
										leftElement={<Icon as={FiHome} />}
										onChange={handleInputChange}
										maxLength={25}
										flex='1 0 48%'
										inputProps={{
											tabIndex: 0,
										}}
									/>
								</Flex>
							</ProfileStackItem>
							{!isLargerThanMd ? (
								<ProfileStackItem display='flex' flexWrap='wrap' gap={4}>
									<ProfileImageUploader />
								</ProfileStackItem>
							) : (
								false
							)}
							<ProfileStackItem title='Contact'>
								<Stack direction='column' spacing={0}>
									<StackItem
										as={TextInput}
										value={email}
										leftElement={<Icon as={FiMail} />}
										placeholder='me@somewhere.com'
										label='Contact Email'
										name='email'
										onChange={handleInputChange}
										inputProps={{
											tabIndex: 0,
										}}
									/>
									{/* TODO Add checkbox for "use account email address" */}
									<StackItem
										as={TextInput}
										value={phone}
										leftElement={<Icon as={FiPhone} />}
										placeholder='(888) 888-8888'
										label='Phone'
										name='phone'
										onChange={handleInputChange}
										inputProps={{
											tabIndex: 0,
										}}
									/>
									<StackItem
										as={TextInput}
										value={website}
										leftElement={<Icon as={FiGlobe} />}
										label='Website'
										name='website'
										onChange={handleInputChange}
										inputProps={{
											tabIndex: 0,
										}}
									/>
								</Stack>
							</ProfileStackItem>
							<ProfileStackItem title='Social' w='full' maxW='3xl' mt={4}>
								<SimpleGrid columns={[1, 2]} spacing={4}>
									<TextInput
										value={socials?.linkedin}
										leftElement={<Icon as={FiLinkedin} />}
										label='LinkedIn URL'
										placeholder='https://linkedin/in/yourprofile'
										name='socials.linkedin'
										onChange={handleSocialInputChange}
									/>
									<TextInput
										value={socials?.facebook}
										leftElement={<Icon as={FiFacebook} />}
										label='Facebook URL'
										placeholder='https://facebook.com/yourname'
										name='socials.facebook'
										onChange={handleSocialInputChange}
									/>
									<TextInput
										value={socials?.instagram}
										leftElement={<Icon as={FiInstagram} />}
										label='Instagram @handle'
										placeholder='@handle'
										name='socials.instagram'
										onChange={handleSocialInputChange}
									/>
									<TextInput
										value={socials?.twitter}
										leftElement={<Icon as={XIcon} />}
										label='X/Twitter @handle'
										placeholder='@handle'
										name='socials.twitter'
										onChange={handleSocialInputChange}
									/>
								</SimpleGrid>
							</ProfileStackItem>
						</Stack>
					</Flex>
				</ProfileStackItem>

				<ProfileStackItem title='Work Locations' fontSize='sm' visible={!isOrg}>
					<>
						<Heading variant='contentSubtitle'>
							Select any areas in which you're a local hire.
						</Heading>
						<ProfileCheckboxGroup
							name='locations'
							isRequired
							requiredMessage='Please select at least one location.'
							items={locationTerms}
							checked={locations ? locations.map((item) => item.toString()) : []}
							handleChange={handleCheckboxInput}
						/>
					</>
				</ProfileStackItem>

				<ProfileStackItem py={4} display='flex' gap={10} visible={!isOrg}>
					<Flex flexWrap='wrap' gap={8} justifyContent='space-between'>
						<Box>
							<Heading variant='contentTitle'>Travel</Heading>
							<Heading variant='contentSubtitle'>Would you work away from home?</Heading>
							<ProfileRadioGroup
								defaultValue={willTravel ? 'true' : 'false'}
								name='willTravel'
								items={[
									{ label: 'Yes', value: 'true' },
									{ label: 'No', value: 'false' },
								]}
								handleChange={handleRadioInputChange}
							/>
						</Box>
						<Box>
							<Heading variant='contentTitle'>Tour</Heading>
							<Heading variant='contentSubtitle'>Would you go on tour?</Heading>
							<ProfileRadioGroup
								defaultValue={willTour ? 'true' : 'false'}
								name='willTour'
								items={[
									{ label: 'Yes', value: 'true' },
									{ label: 'No', value: 'false' },
								]}
								handleChange={handleRadioInputChange}
							/>
						</Box>
						<Box>
							<Heading
								variant='contentTitle'
								flex='0 0 100%'
								textAlign='left'
								alignItems='center'
								display='flex'
							>
								Resume
							</Heading>
							{!resume && <Heading variant='contentSubtitle'>PDF or image</Heading>}
							{resume && resumePreview ? (
								<Flex flexWrap='wrap'>
									<ResumePreviewModal
										resumePreview={resumePreview}
										resumeLink={resume}
										w='100%'
										maxW='300px'
										mr={{ base: 0, sm: 1 }}
										mb={{ base: 1, sm: 0 }}
									/>
									<ClearFieldButton field='resume' label='Delete resume'>
										Clear
									</ClearFieldButton>
								</Flex>
							) : (
								<FileDropzone fieldName='resume' text='Resume' allowPdf={true} />
							)}
						</Box>
					</Flex>
				</ProfileStackItem>

				<ProfileStackItem visible={!isOrg}>
					<Stack display='flex' gap={4}>
						<ProfileStackItem title='Unions/Guilds/Memberships'>
							<>
								<Heading variant='contentSubtitle'>
									What unions or guilds are you a member of?
								</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										name='unions'
										items={unionTerms}
										checked={unions ? unions.map((item) => item.toString()) : []}
										handleChange={handleCheckboxInput}
									/>
								</Box>
							</>
						</ProfileStackItem>
						<ProfileStackItem title='Experience Levels'>
							<>
								<Heading variant='contentSubtitle'>At what levels have you worked?</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										name='experienceLevels'
										items={experienceLevelTerms}
										checked={
											experienceLevels ? experienceLevels.map((item) => item.toString()) : []
										}
										handleChange={handleCheckboxInput}
									/>
								</Box>
							</>
						</ProfileStackItem>
						<ProfileStackItem title='Partner Directories'>
							<>
								<Heading variant='contentSubtitle'>
									Are you a member of one of our partner organizations?
								</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										name='partnerDirectories'
										items={partnerDirectoryTerms}
										checked={
											partnerDirectories ? partnerDirectories.map((item) => item.toString()) : []
										}
										handleChange={handleCheckboxInput}
									/>
								</Box>
							</>
						</ProfileStackItem>
					</Stack>
				</ProfileStackItem>

				<ProfileStackItem
					title='Credits'
					centerlineColor='brand.blue'
					pos='relative'
					id='credits'
					visible={!isOrg}
				>
					<>
						<Text fontSize='lg'>
							Add your 5 best credits here.{' '}
							<Text as='span' fontStyle='italic'>
								You must have at least one credit to be listed in searches!
							</Text>
						</Text>

						<NewCreditButton />

						{/* TODO better reorder and delete animations */}
						{/* TODO "Success" (or error) toast after saving credit and modal closes */}

						{deleteCreditLoading ? (
							<Spinner size='sm' colorScheme='green' />
						) : (
							creditsSorted.map((credit: Credit, index: number) => (
								<Stack key={credit.id} direction='row' alignItems='center'>
									<CreditItem
										credit={credit}
										onClick={() => handleEditCredit(credit.id)}
										isEditable
										key={index}
										width='full'
									/>
									<Stack
										as={isLargerThanMd ? ButtonGroup : undefined}
										gap={{ base: 2, md: 0 }}
										direction={{ base: 'column', md: 'row' }}
									>
										<IconButton
											colorScheme='gray'
											icon={<FiArrowUpCircle />}
											aria-label='Move up Credit'
											isDisabled={index === 0}
											id={credit.id}
											onClick={() => {
												handleCreditMoveUp(index);
											}}
										/>
										<IconButton
											colorScheme='gray'
											icon={<FiArrowDownCircle />}
											aria-label='Move down Credit'
											isDisabled={index === creditsSorted.length - 1}
											id={credit.id}
											onClick={() => {
												handleCreditMoveDown(index);
											}}
										/>
										<DeleteCreditButton handleDeleteCredit={handleDeleteCredit} id={credit.id} />
									</Stack>
								</Stack>
							))
						)}

						<EditCreditModal
							isOpen={creditModalIsOpen}
							onClose={handleCloseEditCredit}
							creditId={editCredit}
						/>
					</>
				</ProfileStackItem>

				<ProfileStackItem title='About' centerlineColor='brand.orange'>
					<>
						<Heading variant='contentTitle'>Bio</Heading>
						<Text my={2} fontSize='lg'>
							Write a little. Write a lot. It's up to you!
						</Text>
						<TextareaInput
							value={description}
							name='description'
							label='Bio'
							labelHidden
							mt={2}
							mb={4}
							onChange={handleInputChange}
							inputProps={{
								rows: 10,
							}}
						/>
					</>
				</ProfileStackItem>

				<ProfileStackItem title='Identity' centerlineColor='brand.yellow' visible={!isOrg}>
					<>
						<Text fontSize='lg'>
							The following optional fields will be <strong>searchable</strong>, but{' '}
							<em>will not appear</em> on your public profile. Select any that apply.
						</Text>
						<Stack direction='row' mt={4} gap={2} flexWrap='wrap'>
							<ProfileStackItem title='Gender' flex='1 0 33%'>
								<ProfileCheckboxGroup
									name='genderIdentities'
									items={genderIdentityTerms}
									checked={genderIdentities ? genderIdentities.map((item) => item.toString()) : []}
									handleChange={handleCheckboxInput}
								/>
							</ProfileStackItem>
							<ProfileStackItem title='Race/Ethnicity' flex='1 0 33%'>
								<ProfileCheckboxGroup
									name='racialIdentities'
									items={racialIdentityTerms}
									checked={racialIdentities ? racialIdentities.map((item) => item.toString()) : []}
									handleChange={handleCheckboxInput}
								/>
							</ProfileStackItem>
							<ProfileStackItem title='Additional' flex='1 0 33%'>
								<ProfileCheckboxGroup
									name='personalIdentities'
									items={personalIdentityTerms}
									checked={
										personalIdentities ? personalIdentities.map((item) => item.toString()) : []
									}
									handleChange={handleCheckboxInput}
								/>
							</ProfileStackItem>
						</Stack>
					</>
				</ProfileStackItem>

				<ProfileStackItem
					title='Education + Training'
					centerlineColor='brand.green'
					visible={!isOrg}
				>
					<TextareaInput
						value={education}
						name='education'
						variant='outline'
						label='Education and training'
						labelHidden
						onChange={handleInputChange}
						inputProps={{
							rows: 4,
						}}
					/>
				</ProfileStackItem>

				<ProfileStackItem title='Media' centerlineColor='brand.blue'>
					<>
						<Heading variant='contentSubtitle'>Showcase your work with images and videos.</Heading>
						<Box>
							<Heading variant='contentTitle'>Videos</Heading>
							<SimpleGrid columns={[1, 2]} spacing={8}>
								<Box>
									<TextInput
										value={mediaVideo1}
										name='mediaVideo1'
										label='Video embed 1'
										placeholder='https://www.youtube.com/watch?v=M67E9mpwBpM'
										leftElement={<FiVideo />}
										onChange={handleInputChange}
									/>
									{mediaVideo1 ? (
										<Box position='relative' paddingBottom='56.25%' w='full'>
											<Box position='absolute' top={0} left={0} width='100%' height='100%'>
												<ReactPlayer url={mediaVideo1} controls width='100%' height='100%' />
											</Box>
										</Box>
									) : (
										false
									)}
								</Box>
								<Box>
									<TextInput
										value={mediaVideo2}
										name='mediaVideo2'
										label='Video embed 2'
										placeholder='https://www.youtube.com/watch?v=eR8YUj3C9lI'
										leftElement={<FiVideo />}
										onChange={handleInputChange}
									/>
									{mediaVideo2 ? (
										<Box position='relative' paddingBottom='56.25%' w='full'>
											<Box position='absolute' top={0} left={0} width='100%' height='100%'>
												<ReactPlayer url={mediaVideo2} controls width='100%' height='100%' />
											</Box>
										</Box>
									) : (
										false
									)}
								</Box>
							</SimpleGrid>
						</Box>
						<Box mt={6}>
							<Heading variant='contentTitle'>Images</Heading>
							<Text fontSize='lg' mb={0}>
								Allowed formats: jpg, png, gif, heic, or webp. 2MB or less, please.
							</Text>
							<Text
								fontSize='md'
								fontStyle='italic'
								_dark={{ color: 'brand.yellow' }}
								_light={{ color: 'brand.blue' }}
								mb={4}
							>
								* By uploading images to your RISE profile, you acknowledge that you own the rights
								or are authorized to use these images as work samples.
							</Text>
							<SimpleGrid columns={[1, 2, 3]} spacing={8}>
								{/* TODO show only the next available uploader, up to limit. */}
								<FileDropzone fieldName='mediaImage1' text='Image 1' />
								<FileDropzone fieldName='mediaImage2' text='Image 2' />
								<FileDropzone fieldName='mediaImage3' text='Image 3' />
								<FileDropzone fieldName='mediaImage4' text='Image 4' />
								<FileDropzone fieldName='mediaImage5' text='Image 5' />
								<FileDropzone fieldName='mediaImage6' text='Image 6' />
							</SimpleGrid>
						</Box>
					</>
				</ProfileStackItem>
			</Stack>

			<Slide
				in={hasEditedProfile === true}
				direction='bottom'
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
					type='submit'
					form='edit-profile'
					leftIcon={saveLoading ? undefined : <FiSave />}
					aria-label={'Save changes'}
					colorScheme='green'
					isDisabled={saveLoading}
					isLoading={!!saveLoading}
					size='lg'
					mr={4}
					my={2}
				>
					Save Changes
				</Button>
			</Slide>
		</form>
	) : null;
}
