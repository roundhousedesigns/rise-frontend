import React, { useContext, useState, useEffect, useRef, ChangeEvent } from 'react';
import {
	Box,
	Heading,
	Image,
	Flex,
	Text,
	Stack,
	Card,
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
	FiCheckCircle,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Credit, UserProfile } from '../lib/classes';
import HeadingCenterline from '../components/common/HeadingCenterline';
import CreditItem from '../components/common/CreditItem';
import EditableTextInput from '../components/common/inputs/EditableTextInput';
import EditableTextareaInput from '../components/common/inputs/EditableTextareaInput';
import ProfileCheckboxGroup from '../components/common/ProfileCheckboxGroup';
import EditTextWithIcon from '../components/common/EditTextWithIcon';
import ProfileRadioGroup from '../components/common/ProfileRadioGroup';
import EditCreditModal from '../components/EditCreditModal';

import { EditProfileContext } from '../context/EditProfileContext';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import { useUpdateProfile } from '../hooks/mutations/useUpdateProfile';
import { useDeleteCredit } from '../hooks/mutations/useDeleteCredit';
import { useUpdateCreditOrder } from '../hooks/mutations/useUpdateCreditOrder';
import useFileUpload from '../hooks/mutations/useFileUpload';
import { useViewer } from '../hooks/queries/useViewer';
import { DeleteAlertDialog } from '../components/DeleteAlertDialog';

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
		// media,
		description,
		credits,
		email,
		resume,
		phone,
		unions,
		experienceLevels,
		genderIdentities,
		racialIdentities,
		personalIdentities,
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

	const handleInputChange = (name: string) => (newValue: any) => {
		editProfileDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value: newValue,
			},
		});
	};

	const handleSocialInputChange = (name: string) => (newValue: any) => {
		const field = name.split('.')[1];

		editProfileDispatch({
			type: 'UPDATE_PERSONAL_LINKS_INPUT',
			payload: {
				name: field,
				value: newValue,
			},
		});
	};

	const handleBooleanInputChange = (name: string) => (newValue: string) => {
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
						position: 'bottom',
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
					duration: 2000,
					isClosable: true,
					position: 'bottom',
				});
			})
			.catch((err) => {
				toast({
					// title: 'Profile not saved.',
					description: 'There was an error saving your profile.',
					status: 'error',
					duration: 2000,
					isClosable: true,
					position: 'bottom',
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
			<ButtonGroup position='fixed' top={24} right={4} zIndex='1' rowGap={1} size='lg'>
				<IconButton
					type='submit'
					aria-label={saveLoading ? 'Saving...' : 'Save profile'}
					colorScheme='green'
					disabled={saveLoading}
					borderRadius='full'
				>
					{saveLoading ? <Spinner size='sm' /> : <FiSave />}
				</IconButton>
				<IconButton
					type='reset'
					colorScheme='orange'
					aria-label='Cancel editing'
					borderRadius='full'
					onClick={handleCancel}
				>
					<FiXCircle />
				</IconButton>
			</ButtonGroup>
			<Stack direction='column' flexWrap='nowrap' gap={4}>
				<StackItem>
					<Card>
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
										<EditableTextInput
											defaultValue={firstName ? firstName : ''}
											mr={2}
											name='firstName'
											fontWeight='medium'
											fontSize='3xl'
											label='First Name'
											handleChange={handleInputChange}
											outerProps={{
												flex: '1',
											}}
										/>
										<EditableTextInput
											defaultValue={lastName ? lastName : ''}
											name='lastName'
											label='Last Name'
											fontWeight='medium'
											fontSize='3xl'
											mr={2}
											handleChange={handleInputChange}
											outerProps={{
												flex: '1',
											}}
										/>
										<EditableTextInput
											defaultValue={pronouns ? pronouns : ''}
											name='pronouns'
											as={Text}
											label='Pronouns'
											fontWeight='medium'
											styles={{ display: 'block' }}
											mb={0}
											handleChange={handleInputChange}
											outerProps={{ flex: '0 0 130px' }}
										/>
									</Flex>
									<EditableTextInput
										defaultValue={homebase ? homebase : ''}
										name='homebase'
										as={Text}
										label='Where do you currently live?'
										fontWeight='medium'
										styles={{ display: 'block' }}
										mb={0}
										handleChange={handleInputChange}
										outerProps={{ flex: '0 0 130px' }}
									/>
								</StackItem>
								<StackItem display='flex' flexWrap='wrap' gap={4}>
									<EditableTextInput
										defaultValue={selfTitle ? selfTitle : ''}
										name='selfTitle'
										placeholder='Title'
										label='Title/Trade/Profession'
										handleChange={handleInputChange}
										outerProps={{ flex: '1 1 60%' }}
									/>
								</StackItem>
							</Stack>
						</Flex>
						<Stack>
							<StackItem>
								<Box fontSize='sm'>
									<Heading variant='contentTitle'>Work Locations</Heading>
									<Heading variant='contentSubtitle'>
										Select any areas in which you're a local hire.
									</Heading>
									<ProfileCheckboxGroup
										name='locations'
										items={locationTerms}
										checked={locations ? locations.map((item) => item.toString()) : []}
										handleChange={handleInputChange}
									/>
								</Box>
							</StackItem>
							<StackItem py={4}>
								<Flex gap={10}>
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
											handleChange={handleBooleanInputChange}
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
											handleChange={handleBooleanInputChange}
										/>
									</Box>
								</Flex>
							</StackItem>
							<StackItem>
								<Flex alignItems='flex-start' gap={8} flexWrap='wrap'>
									<Box flex='1'>
										<Heading variant='contentTitle'>Contact</Heading>
										<EditTextWithIcon
											value={email}
											icon={FiMail}
											label='Email'
											name='email'
											handleChange={handleInputChange}
										/>
										<EditTextWithIcon
											value={phone}
											icon={FiPhone}
											label='Phone'
											name='phone'
											handleChange={handleInputChange}
										/>
										<EditTextWithIcon
											value={website}
											icon={FiGlobe}
											label='Website'
											name='website'
											handleChange={handleInputChange}
										/>
									</Box>
									<Box flex='0 0 33%' textAlign='center'>
										<Heading variant='contentTitle' flex='0 0 100%' textAlign='center'>
											Resume
										</Heading>
										<Flex gap={3} justifyContent='center' flexWrap='wrap'>
											{resume ? (
												<Icon as={FiCheckCircle} boxSize={10} />
											) : (
												<Text>Upload your resume (PDF, DOC, or image)</Text>
											)}
											{/* TODO center input button */}
											{/* TODO add "clear" button */}
											<Input
												type='file'
												name='resume'
												onChange={handleFileInputChange}
												border='none'
												color='transparent'
											/>
										</Flex>
									</Box>
								</Flex>
							</StackItem>
						</Stack>

						<StackItem>
							<Flex>
								<Box flex='1'>
									<Heading variant='contentTitle'>Unions/Guilds</Heading>
									<Heading variant='contentSubtitle'>
										What unions or guilds are you a member of?
									</Heading>
									<Box fontSize='sm'>
										<ProfileCheckboxGroup
											name='unions'
											items={unionTerms}
											checked={unions ? unions.map((item) => item.toString()) : []}
											handleChange={handleInputChange}
										/>
									</Box>
								</Box>
								<Box flex='0 0 30%'>
									<Heading variant='contentTitle'>Experience Levels</Heading>
									<Heading variant='contentSubtitle'>At what levels have you worked?</Heading>
									<Box fontSize='sm'>
										<ProfileCheckboxGroup
											name='experienceLevels'
											items={experienceLevelTerms}
											checked={
												experienceLevels ? experienceLevels.map((item) => item.toString()) : []
											}
											handleChange={handleInputChange}
										/>
									</Box>
								</Box>
							</Flex>
						</StackItem>

						<StackItem>
							<Stack direction='column' gap={4} maxW='600px'>
								<StackItem>
									<Heading variant='contentTitle'>Social</Heading>
									<EditTextWithIcon
										value={socials?.linkedin}
										icon={FiLinkedin}
										label='LinkedIn @handle'
										name='socials.linkedin'
										handleChange={handleSocialInputChange}
									/>
									<EditTextWithIcon
										value={socials?.facebook}
										icon={FiFacebook}
										label='Facebook URL (ex: https://facebook.com/yourname)'
										name='socials.facebook'
										handleChange={handleSocialInputChange}
									/>
									<EditTextWithIcon
										value={socials?.instagram}
										icon={FiInstagram}
										label='Instagram @handle'
										name='socials.instagram'
										handleChange={handleSocialInputChange}
									/>
									<EditTextWithIcon
										value={socials?.twitter}
										icon={FiTwitter}
										label='Twitter @handle'
										name='socials.twitter'
										handleChange={handleSocialInputChange}
									/>
								</StackItem>
							</Stack>
						</StackItem>
					</Card>
				</StackItem>

				<StackItem pos='relative'>
					<HeadingCenterline lineColor='brand.cyan'>Credits</HeadingCenterline>
					<Text>Enter your 5 best credits. Reordering credits is under development.</Text>
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
									isEditable={true}
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
					<HeadingCenterline lineColor='brand.pink'>About</HeadingCenterline>
					<Card>
						<Heading variant='contentTitle'>Bio</Heading>
						<Heading variant='contentSubtitle'>
							Write a little. Write a lot. It's up to you!
						</Heading>
						<EditableTextareaInput
							defaultValue={description ? description : ''}
							name='description'
							label='Bio'
							labelVisuallyHidden
							handleChange={handleInputChange}
						/>
					</Card>
					<Card>
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
										handleChange={handleInputChange}
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
										handleChange={handleInputChange}
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
										handleChange={handleInputChange}
									/>
								</Box>
							</Box>
						</Flex>
					</Card>
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.green'>Education + Training</HeadingCenterline>
					<Card>
						<EditableTextareaInput
							defaultValue={education ? education : ''}
							label='Education'
							labelVisuallyHidden
							name='education'
							handleChange={handleInputChange}
						/>
					</Card>
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.cyan'>Media</HeadingCenterline>
					<Stack direction='column' mt={4} w='full' flexWrap='wrap' gap={2}>
						<Text variant='devAlert' fontSize='md'>
							Photo + video additions under development.
						</Text>
					</Stack>
				</StackItem>
			</Stack>
		</form>
	) : null;
}
