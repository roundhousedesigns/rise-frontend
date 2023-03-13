import { useState, Key, useRef, useEffect, useReducer } from 'react';
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
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { Credit, UserProfile } from '../lib/classes';
import HeadingCenterline from '../components/common/HeadingCenterline';
import CreditItem from '../components/common/CreditItem';
import EditableTextInput from '../components/common/inputs/EditableTextInput';
import EditableTextareaInput from '../components/common/inputs/EditableTextareaInput';
import ProfileCheckboxGroup from '../components/common/ProfileCheckboxGroup';

import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import {
	FiFacebook,
	FiGlobe,
	FiInstagram,
	FiLinkedin,
	FiMail,
	FiPhone,
	FiSave,
	FiTwitter,
	FiXCircle,
} from 'react-icons/fi';
import EditTextWithIcon from '../components/common/EditTextWithIcon';
import FileInput, { FileInputRef } from '../components/common/inputs/FileInput';
import { useUpdateProfile } from '../hooks/mutations/useUpdateProfile';
import ProfileRadioGroup from '../components/common/ProfileRadioGroup';
import { sanitizeBoolean } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

function EditProfileReducer(state: UserProfile, action: { type: string; payload: any }) {
	switch (action.type) {
		case 'UPDATE_INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};

		case 'UPDATE_BOOLEAN_INPUT':
			return {
				...state,
				[action.payload.name]: sanitizeBoolean(action.payload.value),
			};

		case 'UPDATE_SOCIAL_TEXT_INPUT':
			return {
				...state,
				socials: {
					...state.socials,
					[action.payload.name]: action.payload.value,
				},
			};

		case 'RESET':
			return action.payload;

		default:
			return action.payload;
	}
}

interface Props {
	profile: UserProfile | null;
	profileLoading: boolean;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The profile view.
 */
export default function EditProfileView({ profile, profileLoading }: Props): JSX.Element {
	const [editProfile, editProfileDispatch] = useReducer(EditProfileReducer, profile);

	const {
		image,
		firstName,
		lastName,
		pronouns,
		selfTitle,
		socials,
		location,
		education,
		willTravel,
		media,
		description,
		credits,
		email,
		resume,
		phone,
		unions,
		genderIdentities,
		racialIdentities,
		personalIdentities,
	} = editProfile || {};

	// Get all the selectable terms for the user taxonomies.
	const [
		{
			unions: unionTerms,
			genderIdentities: genderIdentityTerms,
			personalIdentities: personalIdentityTerms,
			racialIdentities: racialIdentityTerms,
		},
	] = useUserTaxonomies();

	const {
		updateProfileMutation,
		results: { loading: saveLoading, error: saveError },
	} = useUpdateProfile();

	const toast = useToast();
	const navigate = useNavigate();

	// This is used to trigger a toast when a save is successful.
	const [saveTriggered, setSaveTriggered] = useState<boolean>(false);

	const [resumeIsSet, setResumeIsSet] = useState<boolean>(!!resume);
	const resumeFileInputRef = useRef<FileInputRef>(null);

	// Detect if a resume file has been set to upload, or already exists on the profile.
	useEffect(() => {
		setResumeIsSet(!!resume);
	}, [resume]);

	// When a save is successful, open a toast.
	useEffect(() => {
		if (saveTriggered && !saveLoading && !saveError) {
			toast({
				title: 'Profile saved.',
				description: 'Your profile has been updated.',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top',
			});

			setSaveTriggered(false);
		} else if (saveTriggered && !saveLoading && saveError) {
			toast({
				title: 'Profile not saved.',
				description: 'There was an error saving your profile.',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top',
			});

			setSaveTriggered(false);
		}
	}, [saveTriggered, saveLoading, saveError]);

	const handleInputChange = (name: string) => (newValue: string | Key[]) => {
		// if `name` matches a key in `socials`, update the socials object
		// TODO Break this conditional up into separate change handlers.
		if (name in socials) {
			editProfileDispatch({
				type: 'UPDATE_SOCIAL_TEXT_INPUT',
				payload: {
					name,
					value: newValue,
				},
			});
		} else if (name === 'willTravel') {
			editProfileDispatch({
				type: 'UPDATE_BOOLEAN_INPUT',
				payload: {
					name,
					value: newValue,
				},
			});
		} else {
			editProfileDispatch({
				type: 'UPDATE_INPUT',
				payload: {
					name,
					value: newValue,
				},
			});
		}
	};

	const handleResumeReset = () => {
		if (resumeFileInputRef.current) {
			resumeFileInputRef.current.reset();
		}

		setResumeIsSet(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSaveTriggered(true);

		updateProfileMutation(editProfile).catch((err) => {
			console.error(err);
		});
	};

	const handleCancel = () => {
		navigate('/profile');
	};

	return (
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
							<Box mb={2}>
								{/* TODO Image uploader */}
								{image ? (
									<Image src={image} alt={`${name}'s picture`} loading='eager' fit='cover' w='xs' />
								) : (
									<Flex alignItems='center' justifyContent='center'>
										<FileInput name='image' label='Photo' />
									</Flex>
								)}
							</Box>
							<Stack flex='1' px={{ base: 0, md: 4 }} spacing={4} w='full'>
								<StackItem>
									<Flex alignItems='baseline' gap={2} flexWrap='wrap' w='full'>
										<EditableTextInput
											defaultValue={firstName ? firstName : ''}
											as={Heading}
											mr={2}
											name='firstName'
											fontWeight='medium'
											placeholder='First'
											label='First Name'
											handleChange={handleInputChange}
											outerProps={{
												flex: '1',
											}}
										/>
										<EditableTextInput
											defaultValue={lastName ? lastName : ''}
											name='lastName'
											as={Heading}
											label='Last Name'
											mr={2}
											fontWeight='medium'
											placeholder='Last'
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
											placeholder='your pronouns'
											styles={{ display: 'block' }}
											mb={0}
											handleChange={handleInputChange}
											outerProps={{ flex: '0 0 130px' }}
										/>
									</Flex>
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
									<EditableTextInput
										defaultValue={location ? location : ''}
										name='location'
										placeholder='Location'
										label='Location/Homebase'
										handleChange={handleInputChange}
										outerProps={{ flex: '1 1 40%' }}
									/>
									<ProfileRadioGroup
										defaultValue={willTravel ? 'true' : 'false'}
										name='willTravel'
										items={[
											{ label: 'Will travel', value: 'true' },
											{ label: "Won't travel", value: 'false' },
										]}
										handleChange={handleInputChange}
									/>
								</StackItem>
								<StackItem>
									<Flex alignItems='flex-start' gap={8} flexWrap='wrap'>
										<Box flex='1'>
											<EditTextWithIcon
												value={email}
												icon={FiMail}
												label='Mail'
												labelVisuallyHidden
												name='email'
												handleChange={handleInputChange}
											/>
											<EditTextWithIcon
												value={phone}
												icon={FiPhone}
												label='Phone'
												labelVisuallyHidden
												name='phone'
												handleChange={handleInputChange}
											/>
										</Box>
										<Box flex='1'>
											<Heading variant='contentTitle' flex='0 0 100%' textAlign='center'>
												Resume
											</Heading>
											<Flex gap={3} alignItems='center' justifyContent='center' flexWrap='wrap'>
												{resumeIsSet && resume ? (
													<Button>{resume.split('/').pop()}</Button>
												) : (
													<FileInput
														name='resume'
														label='Upload resume'
														labelVisuallyHidden
														ref={resumeFileInputRef}
													/>
												)}
												{resumeIsSet && resume && (
													<IconButton
														icon={<FiXCircle />}
														aria-label='Clear Resume'
														title='Clear resume'
														bg='brand.red'
														color='white'
														variant='oversized'
														onClick={handleResumeReset}
													/>
												)}
											</Flex>
										</Box>
									</Flex>
								</StackItem>
							</Stack>
						</Flex>

						<StackItem>
							<Heading variant='contentTitle'>Unions/Guilds</Heading>
							<Box fontSize='sm'>
								<ProfileCheckboxGroup
									name='unions'
									items={unionTerms}
									checked={unions}
									handleChange={handleInputChange}
								/>
							</Box>
						</StackItem>

						<StackItem>
							<Stack direction='column' gap={4}>
								<StackItem>
									<Heading variant='contentTitle'>Social + Links</Heading>
									<EditTextWithIcon
										value={socials?.linkedin}
										icon={FiLinkedin}
										label='LinkedIn'
										labelVisuallyHidden
										name='linkedin'
										handleChange={handleInputChange}
									/>
									<EditTextWithIcon
										value={socials?.facebook}
										icon={FiFacebook}
										label='Facebook'
										labelVisuallyHidden
										name='facebook'
										handleChange={handleInputChange}
									/>
									<EditTextWithIcon
										value={socials?.instagram}
										icon={FiInstagram}
										label='Instagram'
										labelVisuallyHidden
										name='instagram'
										handleChange={handleInputChange}
									/>
									<EditTextWithIcon
										value={socials?.twitter}
										icon={FiTwitter}
										label='Twitter'
										labelVisuallyHidden
										name='twitter'
										handleChange={handleInputChange}
									/>
									<EditTextWithIcon
										value={socials?.website}
										icon={FiGlobe}
										label='Website'
										labelVisuallyHidden
										name='website'
										handleChange={handleInputChange}
									/>
								</StackItem>
							</Stack>
						</StackItem>
					</Card>
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.pink'>About</HeadingCenterline>
					<Card>
						<Heading variant='contentTitle'>Bio</Heading>
						<EditableTextareaInput
							defaultValue={description ? description : ''}
							name='description'
							label='Bio'
							labelVisuallyHidden
							handleChange={handleInputChange}
							placeholder="Write a little. Write a lot. It's up to you!"
						/>
					</Card>
					<Card>
						<Heading
							as='h3'
							size='md'
							fontWeight='medium'
							pb={2}
							mb={2}
							color='blackAlpha.800'
							borderBottomWidth='3px'
							borderBottomStyle='dashed'
							borderBottomColor='gray.400'
						>
							The following optional fields will be <strong>searchable</strong>, but{' '}
							<em>will not appear</em> on your public profile.
						</Heading>
						<Flex gap={4} flexWrap='wrap'>
							<Box flex='1 0 33%'>
								<Heading variant='contentTitle'>Gender Identity</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										name='genderIdentities'
										items={genderIdentityTerms}
										checked={genderIdentities}
										handleChange={handleInputChange}
									/>
								</Box>
							</Box>
							<Box flex='1 0 33%'>
								<Heading variant='contentTitle'>Racial Identity</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										name='racialIdentities'
										items={racialIdentityTerms}
										checked={racialIdentities}
										handleChange={handleInputChange}
									/>
								</Box>
							</Box>
							<Box flex='1 0 33%'>
								<Heading variant='contentTitle'>Personal Identity</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										name='personalIdentities'
										items={personalIdentityTerms}
										checked={personalIdentities}
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
						{media && media.length > 0 ? (
							media.map((item: string, index: Key) => (
								<Box key={index}>
									<ReactPlayer url={item} controls={true} />
								</Box>
							))
						) : (
							<Box>Update Media Here</Box>
						)}
					</Stack>
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.cyan'>Credits</HeadingCenterline>
					{credits?.map((credit: Credit, index: Key) => (
						<CreditItem key={index} credit={credit} editable={true} />
					))}
				</StackItem>
			</Stack>
		</form>
	);
}
