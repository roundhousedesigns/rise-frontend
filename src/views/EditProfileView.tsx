import { useContext, useState, useEffect, useRef, Key } from 'react';
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
	Wrap,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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
	FiPlus,
	FiSave,
	FiTwitter,
	FiXCircle,
} from 'react-icons/fi';
import EditTextWithIcon from '../components/common/EditTextWithIcon';
import FileInput, { FileInputRef } from '../components/common/inputs/FileInput';
import { useUpdateProfile } from '../hooks/mutations/useUpdateProfile';
import ProfileRadioGroup from '../components/common/ProfileRadioGroup';
import { EditProfileContext } from '../context/EditProfileContext';

interface Props {
	profile: UserProfile | null;
	profileLoading: boolean;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The profile view.
 */
export default function EditProfileView({ profile, profileLoading }: Props): JSX.Element | null {
	const { editProfile, editProfileDispatch } = useContext(EditProfileContext);

	const {
		image,
		firstName,
		lastName,
		pronouns,
		selfTitle,
		socials,
		locations,
		education,
		willTravel,
		media,
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

	const [resumeIsSet, setResumeIsSet] = useState<boolean>(!!resume);
	const resumeFileInputRef = useRef<FileInputRef>(null);

	const creditsSorted = credits
		? credits.sort((a: Credit, b: Credit) => (a.year > b.year ? -1 : 1))
		: [];

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
		results: { loading: saveLoading, error: saveError },
	} = useUpdateProfile();

	const toast = useToast();
	const navigate = useNavigate();

	// Set context on load
	useEffect(() => {
		if (profile) {
			editProfileDispatch({ type: 'INIT', payload: profile });
		}
	}, []);

	// Detect if a resume file has been set to upload, or already exists on the profile.
	useEffect(() => {
		setResumeIsSet(!!resume);
	}, [resume]);

	const handleInputChange = (name: string) => (newValue: string | Key[]) => {
		editProfileDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value: newValue,
			},
		});
	};

	const handleNestedInputChange = (name: string) => (newValue: string) => {
		const parent = name.split('.')[0];
		const field = name.split('.')[1];

		editProfileDispatch({
			type: 'UPDATE_NESTED_INPUT',
			payload: {
				parent,
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

	const handleNewCredit = () => {
		editProfileDispatch({
			type: 'ADD_CREDIT',
			payload: {},
		});
	};

	const handleResumeReset = () => {
		if (resumeFileInputRef.current) {
			resumeFileInputRef.current.reset();
		}

		setResumeIsSet(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		updateProfileMutation(editProfile)
			.then(() => {
				// toast({
				// 	title: 'Profile saved.',
				// 	description: 'Your profile has been updated.',
				// 	status: 'success',
				// 	duration: 5000,
				// 	isClosable: true,
				// 	position: 'top',
				// });
				navigate('/profile');
			})
			.catch((err) => {
				toast({
					title: 'Profile not saved.',
					description: 'There was an error saving your profile.',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'top',
				});

				console.error(err);
			});
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
							<Box mb={2}>
								{/* TODO Image uploader */}
								{image ? (
									<>
										<Image src={image} alt={`Profile picture`} loading='eager' fit='cover' w='xs' />
									</>
								) : (
									<Flex alignItems='center' justifyContent='center'>
										<FileInput name='image' label='Photo' />
									</Flex>
								)}
								<Text
									textAlign='center'
									fontSize='sm'
									fontWeight='bold'
									color='brand.red'
									flex='0 0 100%'
								>
									Photo uploads are under development.
								</Text>
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
									<Box fontSize='sm'>
										<Heading variant='contentTitle'>Locations/Homebases</Heading>
										<Heading variant='contentSubtitle'>Where do you live and work?</Heading>
										<ProfileCheckboxGroup
											name='locations'
											items={locationTerms}
											checked={locations ? locations.map((item) => item.toString()) : []}
											handleChange={handleInputChange}
										/>
									</Box>
									<Box fontSize='sm'>
										<Heading variant='contentTitle'>Willing to travel?</Heading>
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
												<Text variant='devAlert'>Resume uploads are under development.</Text>
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
						</StackItem>

						<StackItem>
							<Heading variant='contentTitle'>Experience Levels</Heading>
							<Heading variant='contentSubtitle'>At what levels have you worked?</Heading>
							<Box fontSize='sm'>
								<ProfileCheckboxGroup
									name='experienceLevels'
									items={experienceLevelTerms}
									checked={experienceLevels ? experienceLevels.map((item) => item.toString()) : []}
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
										label='LinkedIn @handle'
										name='socials.linkedin'
										handleChange={handleNestedInputChange}
									/>
									<EditTextWithIcon
										value={socials?.facebook}
										icon={FiFacebook}
										label='Facebook URL (ex: https://facebook.com/yourname)'
										name='socials.facebook'
										handleChange={handleNestedInputChange}
									/>
									<EditTextWithIcon
										value={socials?.instagram}
										icon={FiInstagram}
										label='Instagram @handle'
										name='socials.instagram'
										handleChange={handleNestedInputChange}
									/>
									<EditTextWithIcon
										value={socials?.twitter}
										icon={FiTwitter}
										label='Twitter @handle'
										name='socials.twitter'
										handleChange={handleNestedInputChange}
									/>
									<EditTextWithIcon
										value={socials?.website}
										icon={FiGlobe}
										label='Website'
										name='socials.website'
										handleChange={handleNestedInputChange}
									/>
								</StackItem>
							</Stack>
						</StackItem>
					</Card>
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.cyan'>Credits</HeadingCenterline>
					<Wrap>
						<Text>Enter your 5 best credits.</Text>
						<Text variant='devAlert'>
							We are aware of the issues working with Credits. Please stay tuned.
						</Text>
					</Wrap>
					{creditsSorted?.map((credit: Credit, index: Key) => (
						<CreditItem key={index} credit={credit} editable={true} />
					))}
					{creditsSorted?.length < 5 && (
						<IconButton
							aria-label='Add a new credit'
							icon={<FiPlus />}
							onClick={handleNewCredit}
						></IconButton>
					)}
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
						{media && media.length > 0 ? (
							media.map((item: string, index: Key) => (
								<Box key={index}>
									<ReactPlayer url={item} controls={true} />
								</Box>
							))
						) : (
							<Text variant='devAlert' fontSize='md'>
								Photo + video additions under development.
							</Text>
						)}
					</Stack>
				</StackItem>
			</Stack>
		</form>
	) : null;
}
