import React, { useContext, useState, useEffect, useRef, ChangeEvent } from 'react';
import {
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
	Input,
	Icon,
	Progress,
	Link,
	SimpleGrid,
	FormLabel,
	FormControl,
	useMediaQuery,
	chakra,
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
	FiTwitter,
	FiXCircle,
	FiArrowUpCircle,
	FiArrowDownCircle,
	FiImage,
	FiHome,
	FiStar,
	FiVideo,
	FiUpload,
} from 'react-icons/fi';

import { Credit, UserProfile } from '../lib/classes';
import { EditProfileContext } from '../context/EditProfileContext';
import useViewer from '../hooks/queries/useViewer';
import useUpdateProfile from '../hooks/mutations/useUpdateProfile';
import useDeleteCredit from '../hooks/mutations/useDeleteCredit';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import useFileUpload from '../hooks/mutations/useFileUpload';
import useClearProfileField from '../hooks/mutations/useClearProfileFileField';
import { useUpdateCreditOrder } from '../hooks/mutations/useUpdateCreditOrder';

import HeadingCenterline from '../components/common/HeadingCenterline';
import CreditItem from '../components/common/CreditItem';
import ProfileCheckboxGroup from '../components/common/ProfileCheckboxGroup';
import ProfileRadioGroup from '../components/common/ProfileRadioGroup';
import EditCreditModal from '../components/EditCreditModal';
import DeleteCreditAlertDialog from '../components/DeleteCreditAlertDialog';
import TextInput from '../components/common/inputs/TextInput';
import TextareaInput from '../components/common/inputs/TextareaInput';
import { useProfileEdited } from '../hooks/hooks';

// TODO Refactor into smaller components.
// TODO Add cancel/navigation-away confirmation when exiting with edits

interface Props {
	profile: UserProfile | null;
	profileLoading: boolean;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The profile view.
 */
// TODO kill profileLoading prop, just use it in the parent.
export default function EditProfileView({ profile, profileLoading }: Props): JSX.Element | null {
	const { editProfile, editProfileDispatch } = useContext(EditProfileContext);
	const { loggedInId } = useViewer();

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

	const [editCredit, setEditCredit] = useState<string>('');
	const editCreditId = useRef<string>('');

	const [creditsSorted, setCreditsSorted] = useState<Credit[]>([]);
	const [hasEditedCreditOrder, setHasEditedCreditOrder] = useState<Boolean>(false);

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const {
		uploadFileMutation,
		results: { loading: uploadFileMutationLoading },
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
	const [willDeleteCredits, setWillDeleteCredits] = useState<Boolean>(false);

	const hasEditedProfile = useProfileEdited(editProfile, originalProfile.current);

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
			onOpen();
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

			setCreditsSorted(
				existingCredits.sort((a: Credit, b: Credit) => (a.index > b.index ? 1 : -1))
			);
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

	// Set context on load
	useEffect(() => {
		if (profile) {
			editProfileDispatch({ type: 'INIT', payload: { profile } });
		}
	}, []);

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

		const { name, files } = event.target;
		const file = files[0];
		const maxSize = 2 * 1024 * 1024; // 2MB (adjust as necessary)

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
					title: 'Image saved!',
					position: 'top',
					description: 'Your image has been uploaded.',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleFileInputClear = (event: React.MouseEvent<HTMLButtonElement>) => {
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
			type: 'ADD_CREDIT',
			payload: {},
		});
	};

	const handleDeleteCredit = (creditId: string) => {
		if (creditId !== '') {
			deleteCreditMutation(creditId, loggedInId)
				.then(() => {
					toast({
						// title: 'Credit deleted.',
						description: 'Your credit has been deleted.',
						status: 'success',
						duration: 5000,
						isClosable: true,
						position: 'top',
					});
					editProfileDispatch({
						type: 'DELETE_CREDIT',
						payload: {
							creditId: creditId,
						},
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		updateProfileMutation(editProfile)
			.then(() => {
				setWillDeleteCredits(false);
				navigate('/profile');
			})
			.then(() => {
				toast({
					// title: 'Profile saved.',
					description: 'Your profile has been updated.',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'top',
				});
			})
			.catch((err) => {
				toast({
					// title: 'Profile not saved.',
					description: 'There was an error saving your profile.',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'top',
				});

				// DEBUG
				console.error(err);
			});
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleEditCredit = (creditId: string) => {
		setEditCredit(creditId);
		onOpen();
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

		onClose();
	};

	const handleCancel = () => {
		navigate('/profile');
	};

	const ClearFieldButton = ({
		field,
		content = <FiXCircle />,
	}: {
		field: string;
		content?: string | number | JSX.Element;
	}) => {
		if (!field) return null;

		return (
			<Button
				size='md'
				colorScheme='orange'
				onClick={handleFileInputClear}
				data-field={field}
				p={0}
			>
				{clearProfileFieldMutationLoading && fieldCurrentlyClearing === field ? (
					<Spinner />
				) : (
					content
				)}
			</Button>
		);
	};

	const FileUploadButton = ({
		fieldName,
		content = 'Upload',
		icon,
		accept,
	}: {
		fieldName: string;
		content?: string | number | JSX.Element;
		icon?: JSX.Element;
		accept?: string;
	}) => {
		return (
			<FormControl>
				<Button
					as={FormLabel}
					leftIcon={icon ? icon : undefined}
					size='md'
					w='full'
					colorScheme='green'
					opacity={uploadFileMutationLoading || clearProfileFieldMutationLoading ? 0.5 : 1}
					cursor={
						uploadFileMutationLoading || clearProfileFieldMutationLoading ? 'progress' : 'pointer'
					}
				>
					{content}
					<Input
						variant='file'
						type='file'
						formEncType='multipart/form-data'
						multiple={false}
						name={fieldName}
						accept={accept}
						isDisabled={uploadFileMutationLoading || clearProfileFieldMutationLoading}
						onChange={handleFileInputChange}
					/>
				</Button>
			</FormControl>
		);
	};

	const ProgressBar = () => (
		<Progress size='md' isIndeterminate colorScheme='blue' hasStripe={true} w='full' />
	);

	const ProfileImageUploader = () => (
		<Box mb={2} width='30%' minWidth='300px'>
			<Heading variant='contentTitle' my={0}>
				Profile image
			</Heading>
			<Heading variant='contentSubtitle' fontSize='sm'>
				Portrait orientation works best. Max 2MB.
			</Heading>
			{uploadFileMutationLoading ? (
				// Uploading
				<Flex alignItems='center' justifyContent='center' h='200px'>
					<ProgressBar />
				</Flex>
			) : image ? (
				// Image set
				<Image
					src={image}
					alt={`Profile picture`}
					loading='eager'
					fit='cover'
					borderRadius='md'
					w='xs'
					mb={2}
				/>
			) : (
				// No image set
				<Flex alignItems='center' justifyContent='center' w='full' h='100px'>
					<Icon as={FiImage} boxSize='60px' />
				</Flex>
			)}
			<Flex gap={2}>
				<FileUploadButton fieldName='image' accept='image/*' content='Upload image' />
				<ClearFieldButton field='image' />
			</Flex>
		</Box>
	);

	const MediaImageUploader = ({ fieldName, text }: { fieldName: string; text: string }) => {
		const image = eval(fieldName);

		return (
			<Box>
				<Flex gap={2}>
					<FileUploadButton
						fieldName={fieldName}
						content={text}
						icon={<FiUpload />}
						accept='image/*'
					/>
					{image ? <ClearFieldButton field={fieldName} /> : false}
				</Flex>
				{image ? (
					<Image
						src={image}
						alt={text}
						loading='eager'
						fit='cover'
						w='xs'
						mb={2}
						borderRadius='md'
					/>
				) : uploadFileMutationLoading && fieldCurrentlyUploading === fieldName ? (
					<ProgressBar />
				) : (
					false
				)}
			</Box>
		);
	};

	return editProfile ? (
		<form onSubmit={handleSubmit}>
			<Flex
				alignItems='center'
				justifyContent='flex-end'
				borderTopWidth='1px'
				borderTopColor='gray.100'
				position='fixed'
				bottom='0'
				left='0'
				width='full'
				height='56px'
				bgColor='text.light'
				zIndex='100'
			>
				<ButtonGroup rowGap={2} gap={2} size='md' mr={4}>
					<Button
						type='submit'
						leftIcon={saveLoading ? undefined : <FiSave />}
						aria-label={saveLoading ? 'Saving...' : 'Save profile'}
						colorScheme='green'
						isDisabled={saveLoading || !hasEditedProfile}
						mx={0}
					>
						{saveLoading ? <Spinner size='sm' /> : 'Save'}
					</Button>
					<Button
						type='reset'
						leftIcon={<FiXCircle />}
						colorScheme='orange'
						aria-label='Cancel editing'
						onClick={handleCancel}
						marginInlineStart='0 !important'
					>
						Cancel
					</Button>
				</ButtonGroup>
			</Flex>
			<Stack direction='column' flexWrap='nowrap' gap={4}>
				<StackItem py={2} mt={2}>
					{profileLoading && <Spinner alignSelf='center' />}
					<Flex alignItems='flex-start' flexWrap='wrap' mt={2}>
						{isLargerThanMd ? <ProfileImageUploader /> : false}
						<Stack flex='1' px={{ base: 0, md: 4 }} spacing={4} w='full'>
							<StackItem>
								<Flex alignItems='flex-end' gap={2} flexWrap='wrap' w='full'>
									<TextInput
										placeholder='First'
										value={firstName}
										name='firstName'
										isRequired
										onChange={handleInputChange}
										flex='1'
										label='First name'
										minW='200px'
										inputProps={{
											tabIndex: 1,
										}}
									/>
									<TextInput
										placeholder='Last'
										value={lastName}
										name='lastName'
										isRequired
										label='Last name'
										onChange={handleInputChange}
										flex='1'
										minW='200px'
										inputProps={{
											tabIndex: 2,
										}}
									/>
									<TextInput
										placeholder='pronouns'
										value={pronouns}
										name='pronouns'
										label='Pronouns'
										onChange={handleInputChange}
										flex='1'
										maxW='150px'
										inputProps={{
											size: 'md',
											tabIndex: 3,
										}}
									/>
								</Flex>
								<Flex alignItems='flex-start' gap={2} flexWrap='wrap' w='full' mt={4}>
									<TextInput
										placeholder='homebase'
										value={homebase}
										name='homebase'
										label='Where do you currently live?'
										leftElement={<Icon as={FiHome} />}
										onChange={handleInputChange}
										inputProps={{
											maxLength: 25,
											tabIndex: 4,
										}}
										flex='1'
									/>
									<TextInput
										value={selfTitle}
										name='selfTitle'
										placeholder='Title'
										label='Title/Trade/Profession'
										leftElement={<Icon as={FiStar} />}
										onChange={handleInputChange}
										inputProps={{
											maxLength: 50,
											tabIndex: 5,
										}}
										flex='1'
									/>
								</Flex>
							</StackItem>
							{!isLargerThanMd ? (
								<StackItem display='flex' flexWrap='wrap' gap={4}>
									<ProfileImageUploader />
								</StackItem>
							) : (
								false
							)}
							<StackItem display='flex' flexWrap='wrap' gap={4}>
								<Box flex='1'>
									<Heading variant='contentTitle' mb={2}>
										Contact
									</Heading>
									<Stack direction='column' spacing={0}>
										<TextInput
											value={email}
											leftElement={<Icon as={FiMail} />}
											placeholder='me@somewhere.com'
											label='Contact Email'
											name='email'
											onChange={handleInputChange}
											inputProps={{
												tabIndex: 6,
											}}
										/>
										{/* TODO Add checkbox for "use account email address" */}
										<TextInput
											value={phone}
											leftElement={<Icon as={FiPhone} />}
											placeholder='(888) 888-8888'
											label='Phone'
											name='phone'
											onChange={handleInputChange}
											inputProps={{
												tabIndex: 7,
											}}
										/>
										<TextInput
											value={website}
											leftElement={<Icon as={FiGlobe} />}
											label='Website'
											name='website'
											onChange={handleInputChange}
											inputProps={{
												tabIndex: 8,
											}}
										/>
									</Stack>
								</Box>
							</StackItem>
						</Stack>
					</Flex>
					<Stack>
						<StackItem fontSize='sm'>
							{/* TODO make this required */}
							<Heading variant='contentTitle'>Work Locations</Heading>
							<Heading variant='contentSubtitle'>
								Select any areas in which you're a local hire.
							</Heading>
							<ProfileCheckboxGroup
								name='locations'
								isRequired
								items={locationTerms}
								checked={locations ? locations.map((item) => item.toString()) : []}
								handleChange={handleCheckboxInput}
							/>
						</StackItem>
						<StackItem py={4} display='flex' gap={10}>
							<Flex flexWrap='wrap' gap={6}>
								<Box>
									<Heading variant='contentTitle'>Travel</Heading>
									<Heading variant='contentSubtitle'>Willing to work away from home?</Heading>
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
								<Box flex='1 0 100%' textAlign='center'>
									<Heading variant='contentTitle' flex='0 0 100%' textAlign='left'>
										Resume
									</Heading>
									<Flex gap={3} flexWrap='wrap'>
										<Heading variant='contentSubtitle'>
											{resume ? (
												<Link
													m={0}
													fontSize='md'
													fontWeight='medium'
													href={resume}
													variant='dotted'
													download
												>
													Preview your resume
												</Link>
											) : (
												'PDF or image'
											)}
										</Heading>
										{/* TODO center input button */}
										{/* TODO add "clear" button */}

										<FileUploadButton fieldName='resume' accept='application/pdf, image/*' />
									</Flex>
								</Box>
							</Flex>
						</StackItem>
					</Stack>

					<StackItem py={4}>
						<Flex flexWrap='wrap' gap={4}>
							<Box flex='1 0 100%'>
								<Heading variant='contentTitle'>Unions/Guilds</Heading>
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
							</Box>
							<Box flex='1'>
								<Heading variant='contentTitle'>Experience Levels</Heading>
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
							</Box>
							<Box flex='1'>
								<Heading variant='contentTitle'>Partner Directories</Heading>
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
							</Box>
						</Flex>
					</StackItem>

					<StackItem w='full' maxW='3xl'>
						<Heading variant='contentTitle'>Social</Heading>

						<SimpleGrid columns={[1, 2]} spacing={4}>
							<TextInput
								value={socials?.linkedin}
								leftElement={<Icon as={FiLinkedin} />}
								label='LinkedIn @handle'
								placeholder='@yourname'
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
								leftElement={<Icon as={FiTwitter} />}
								label='Twitter @handle'
								placeholder='@handle'
								name='socials.twitter'
								onChange={handleSocialInputChange}
							/>
						</SimpleGrid>
					</StackItem>
				</StackItem>

				<StackItem pos='relative'>
					<HeadingCenterline lineColor='brand.blue'>Credits</HeadingCenterline>
					<Text>Enter your 5 best credits.</Text>
					{/* TODO better reorder animation */}

					{willDeleteCredits ? (
						<Text variant='devAlert'>
							Please save your profile to confirm deleting credits, or cancel to undo.
						</Text>
					) : (
						false
					)}
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
								<Stack>
									{index > 0 ? (
										<IconButton
											size='lg'
											colorScheme='gray'
											icon={<FiArrowUpCircle />}
											aria-label='Move up Credit'
											id={credit.id}
											onClick={() => {
												handleCreditMoveUp(index);
											}}
										/>
									) : (
										false
									)}
									{index < creditsSorted.length - 1 ? (
										<IconButton
											size='lg'
											colorScheme='gray'
											icon={<FiArrowDownCircle />}
											aria-label='Move down Credit'
											id={credit.id}
											onClick={() => {
												handleCreditMoveDown(index);
											}}
										/>
									) : (
										false
									)}
								</Stack>
								<DeleteCreditAlertDialog handleDeleteCredit={handleDeleteCredit} id={credit.id} />
							</Stack>
						))
					)}
					{editProfile.credits?.length < 5 && (
						<Button aria-label='Add a new credit' leftIcon={<FiPlus />} onClick={handleNewCredit}>
							New Credit
						</Button>
					)}
					<EditCreditModal isOpen={isOpen} onClose={handleCloseEditCredit} creditId={editCredit} />
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.orange'>About</HeadingCenterline>
					<Box>
						<Heading variant='contentTitle'>Bio</Heading>
						<Heading variant='contentSubtitle' my={2}>
							Write a little. Write a lot. It's up to you!
						</Heading>
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
					</Box>
					<Box>
						<Heading
							size='md'
							fontWeight='bold'
							pb={2}
							mb={2}
							color='blackAlpha.800'
							border='3px dashed gray.400'
							borderBottomWidth='3px'
							borderBottomStyle='dashed'
							borderBottomColor='gray.400'
							variant='contentTitle'
						>
							Identity
						</Heading>
						<Heading variant='contentSubtitle'>
							The following optional fields will be <strong>searchable</strong>, but{' '}
							<em>will not appear</em> on your public profile.
						</Heading>
						<Flex gap={4} flexWrap='wrap'>
							<Box flex='1 0 33%'>
								<Heading variant='contentTitle'>Gender</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										name='genderIdentities'
										items={genderIdentityTerms}
										checked={
											genderIdentities ? genderIdentities.map((item) => item.toString()) : []
										}
										handleChange={handleCheckboxInput}
									/>
								</Box>
							</Box>
							<Box flex='1 0 33%'>
								<Heading variant='contentTitle'>Race/Ethnicity</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										name='racialIdentities'
										items={racialIdentityTerms}
										checked={
											racialIdentities ? racialIdentities.map((item) => item.toString()) : []
										}
										handleChange={handleCheckboxInput}
									/>
								</Box>
							</Box>
							<Box flex='1 0 33%'>
								<Heading variant='contentTitle'>Additional</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										name='personalIdentities'
										items={personalIdentityTerms}
										checked={
											personalIdentities ? personalIdentities.map((item) => item.toString()) : []
										}
										handleChange={handleCheckboxInput}
									/>
								</Box>
							</Box>
						</Flex>
					</Box>
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.green'>Education + Training</HeadingCenterline>
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
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.blue'>Media</HeadingCenterline>
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
						<SimpleGrid columns={[1, 2, 3]} spacing={8}>
							{/* TODO show only the next available uploader, up to limit. */}
							<MediaImageUploader fieldName='mediaImage1' text='Image 1' />
							<MediaImageUploader fieldName='mediaImage2' text='Image 2' />
							<MediaImageUploader fieldName='mediaImage3' text='Image 3' />
							<MediaImageUploader fieldName='mediaImage4' text='Image 4' />
							<MediaImageUploader fieldName='mediaImage5' text='Image 5' />
							<MediaImageUploader fieldName='mediaImage6' text='Image 6' />
						</SimpleGrid>
					</Box>
				</StackItem>
			</Stack>
		</form>
	) : null;
}
