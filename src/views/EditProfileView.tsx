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
} from '@chakra-ui/react';
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
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Credit, UserProfile } from '../lib/classes';
import { useUpdateProfile } from '../hooks/mutations/useUpdateProfile';
import { useDeleteCredit } from '../hooks/mutations/useDeleteCredit';
import { useUpdateCreditOrder } from '../hooks/mutations/useUpdateCreditOrder';
import HeadingCenterline from '../components/common/HeadingCenterline';
import CreditItem from '../components/common/CreditItem';
import ProfileCheckboxGroup from '../components/common/ProfileCheckboxGroup';
import ProfileRadioGroup from '../components/common/ProfileRadioGroup';
import EditCreditModal from '../components/EditCreditModal';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import useFileUpload from '../hooks/mutations/useFileUpload';
import { EditProfileContext } from '../context/EditProfileContext';
import { useViewer } from '../hooks/queries/useViewer';
import { DeleteAlertDialog } from '../components/DeleteAlertDialog';
import TextInput from '../components/common/inputs/TextInput';
import TextareaInput from '../components/common/inputs/TextareaInput';

// TODO Refactor into smaller components.
// TODO Add cancel/navigation-away confirmation when exiting with edits

export type AlertProps = {
	id: string;
	handleDeleteCredit: (id: string) => void;
};

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

	const [editCredit, setEditCredit] = useState<string>('');
	const editCreditId = useRef<string>('');

	const {
		uploadFileMutation,
		results: { loading: uploadFileMutationLoading },
	} = useFileUpload();

	const {
		updateCreditOrderMutation,
		results: { loading: updateCreditOrderLoading },
	} = useUpdateCreditOrder();

	const [creditsSorted, setCreditsSorted] = useState<Credit[]>([]);
	const [hasEditedCreditOrder, setHasEditedCreditOrder] = useState<Boolean>(false);

	const {
		deleteCreditMutation,
		results: { loading: deleteCreditLoading },
	} = useDeleteCredit();
	const [willDeleteCredits, setWillDeleteCredits] = useState<Boolean>(false);

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
	}, [credits]);

	// Resort the credits on rerender.
	useEffect(() => {
		if (credits && credits.length > 0) {
			// Remove credits with the isNew property set to true.
			const existingCredits = credits.filter((credit) => !credit.isNew);

			setCreditsSorted(
				existingCredits.sort((a: Credit, b: Credit) => (a.index > b.index ? 1 : -1))
			);
		}
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

		const file = event.target.files[0];
		const { name } = event.target;

		if (!file || !name) return;

		uploadFileMutation(file, name, loggedInId)
			.then((result) => {
				editProfileDispatch({
					type: 'UPDATE_INPUT',
					payload: {
						name,
						value: result.data.uploadFile.fileUrl,
					},
				});
			})
			.catch((err) => {
				console.error(err);
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
			deleteCreditMutation(creditId)
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
						disabled={saveLoading}
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
				<StackItem>
					<Box py={2} mt={2}>
						{profileLoading && <Spinner alignSelf='center' />}
						<Flex alignItems='flex-start' flexWrap='wrap' mt={2}>
							<Box mb={2} width='30%'>
								{/* TODO Image uploader */}
								{uploadFileMutationLoading ? (
									<Flex alignItems='center' justifyContent='center' h='200px'>
										<Text textAlign='center' fontSize='sm'>
											Uploading...
										</Text>
										<Progress size='md' isIndeterminate />
									</Flex>
								) : image ? (
									<>
										<Image
											src={image}
											alt={`Profile picture`}
											loading='eager'
											fit='cover'
											borderRadius='md'
											w='xs'
											mb={2}
										/>
										{/* TODO clear/remove image button */}
										{/* <Button size='sm' colorScheme='orange'>Remove image</Button> */}
									</>
								) : (
									<Flex alignItems='center' justifyContent='center' w='full' h='200px'>
										<Icon as={FiImage} boxSize='60px' />
									</Flex>
								)}
								{/* TODO size limit validation */}
								<Input
									type='file'
									name='image'
									onChange={handleFileInputChange}
									border='none'
									color='transparent'
								/>
							</Box>
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
											inputProps={{
												size: 'xl',
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
											inputProps={{
												size: 'xl',
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
								<Box flex='0 0 33%' textAlign='center'>
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
										<Input
											type='file'
											name='resume'
											onChange={handleFileInputChange}
											border='none'
											pl='0'
										/>
									</Flex>
								</Box>
							</StackItem>
						</Stack>

						<StackItem>
							<Flex flexWrap='wrap' gap={4}>
								<Box flex='1'>
									<Heading variant='contentTitle'>Unions/Guilds</Heading>
									<Heading variant='contentSubtitle'>
										What unions or guilds are you a member of?
										<br />
										<br />
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
								<Box flex='0 0 30%'>
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
								<Box flex='0 0 30%'>
									<Heading variant='contentTitle'>Experience Levels</Heading>
									<Heading variant='contentSubtitle'>
										At what levels have you worked?
										<br />
										<br />
									</Heading>
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
							</Flex>
						</StackItem>

						<StackItem>
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
					</Box>
				</StackItem>

				<StackItem pos='relative'>
					<HeadingCenterline lineColor='brand.blue'>Credits</HeadingCenterline>
					<Text>Enter your 5 best credits.</Text>
					{updateCreditOrderLoading ? (
						<Box
							pos='absolute'
							h='full'
							w='full'
							left='0'
							top='0'
							bgColor='whiteAlpha.600'
							zIndex='1'
							display='flex'
							alignItems='center'
							justifyContent='center'
						>
							<Spinner color='blue' size='xl' />
						</Box>
					) : (
						false
					)}
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
								<DeleteAlertDialog handleDeleteCredit={handleDeleteCredit} id={credit.id} />
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
								rows: 20,
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
							<Box>
								<FormControl>
									<FormLabel>Image 1</FormLabel>
									<Input
										type='file'
										name='mediaImage1'
										onChange={handleFileInputChange}
										border='none'
										pl='0'
									/>
								</FormControl>
								{mediaImage1 ? (
									<Image
										src={mediaImage1}
										alt={`Media image 1`}
										loading='eager'
										fit='cover'
										w='xs'
										mb={2}
									/>
								) : (
									false
								)}
							</Box>
							<Box>
								<FormControl>
									<FormLabel>Image 2</FormLabel>
									<Input
										type='file'
										name='mediaImage2'
										onChange={handleFileInputChange}
										border='none'
										pl='0'
									/>
								</FormControl>
								{mediaImage2 ? (
									<Image
										src={mediaImage2}
										alt={`Media image 2`}
										loading='eager'
										fit='cover'
										w='xs'
										mb={2}
									/>
								) : (
									false
								)}
							</Box>
							<Box>
								<FormControl>
									<FormLabel>Image 3</FormLabel>
									<Input
										type='file'
										name='mediaImage3'
										onChange={handleFileInputChange}
										border='none'
										pl='0'
									/>
								</FormControl>
								{mediaImage3 ? (
									<Image
										src={mediaImage3}
										alt={`Media image 3`}
										loading='eager'
										fit='cover'
										w='xs'
										mb={2}
									/>
								) : (
									false
								)}
							</Box>
							<Box>
								<FormControl>
									<FormLabel>Image 4</FormLabel>
									<Input
										type='file'
										name='mediaImage4'
										onChange={handleFileInputChange}
										border='none'
										pl='0'
									/>
								</FormControl>
								{mediaImage1 ? (
									<Image
										src={mediaImage4}
										alt={`Media image 4`}
										loading='eager'
										fit='cover'
										w='xs'
										mb={2}
									/>
								) : (
									false
								)}
							</Box>
							<Box>
								<FormControl>
									<FormLabel>Image 5</FormLabel>
									<Input
										type='file'
										name='mediaImage5'
										onChange={handleFileInputChange}
										border='none'
										pl='0'
									/>
								</FormControl>
								{mediaImage5 ? (
									<Image
										src={mediaImage5}
										alt={`Media image 5`}
										loading='eager'
										fit='cover'
										w='xs'
										mb={2}
									/>
								) : (
									false
								)}
							</Box>
							<Box>
								<FormControl>
									<FormLabel>Image 6</FormLabel>
									<Input
										type='file'
										name='mediaImage6'
										onChange={handleFileInputChange}
										border='none'
										pl='0'
									/>
								</FormControl>
								{mediaImage6 ? (
									<Image
										src={mediaImage6}
										alt={`Media image 6`}
										loading='eager'
										fit='cover'
										w='xs'
										mb={2}
									/>
								) : (
									false
								)}
							</Box>
						</SimpleGrid>
					</Box>
				</StackItem>
			</Stack>
		</form>
	) : null;
}
