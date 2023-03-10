import { useState, Key, useRef, useEffect, useReducer } from 'react';
import {
	Box,
	Heading,
	Image,
	Flex,
	Text,
	Icon,
	Stack,
	Card,
	Avatar,
	Tag,
	Spinner,
	StackItem,
	IconButton,
	Button,
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
	FiFileText,
	FiGlobe,
	FiInstagram,
	FiLinkedin,
	FiMail,
	FiMapPin,
	FiPhone,
	FiTwitter,
	FiXCircle,
} from 'react-icons/fi';
import EditTextWithIcon from '../components/common/EditTextWithIcon';
import FileInput, { FileInputRef } from '../components/common/inputs/FileInput';

// TODO type the action param more specifically
function EditProfileReducer(state: UserProfile, action: { type: string; payload: any }) {
	switch (action.type) {
		case 'INIT':
			return action.payload;

		case 'UPDATE':
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
}

interface Props {
	profile: UserProfile | null;
	loading: boolean;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The profile view.
 */
export default function EditProfileView({ profile, loading }: Props): JSX.Element {
	const [editProfile, editProfileDispatch] = useReducer(EditProfileReducer, profile);

	const {
		image,
		name,
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
	} = editProfile || {};

	const [{ genderIdentities, personalIdentities, racialIdentities, unions }] = useUserTaxonomies();

	const [resumeIsSet, setResumeIsSet] = useState<boolean>(!!resume);
	const resumeFileInputRef = useRef<FileInputRef>(null);

	// Detect if a resume file has been set to upload, or already exists on the profile.
	useEffect(() => {
		setResumeIsSet(!!resume);
	}, [resume]);

	const handleEditableInputChange = (name: string) => (newValue: string) => {
		console.info(name, newValue);
		// editProfileDispatch({
		// 	type: 'UPDATE',
		// 	payload: {
		// 		[e.target.name]: e.target.value,
		// 	},
		// });
	};

	const handleResumeReset = () => {
		if (resumeFileInputRef.current) {
			resumeFileInputRef.current.reset();
		}

		setResumeIsSet(false);
	};

	/**
	 * Generate the text to display for the 'will travel' field.
	 *
	 * @returns {string} The text to display.
	 */
	const willTravelText = (): string => {
		const str = 'Willing to travel';
		return profile?.willTravel ? str : `Not ${str.toLowerCase()}`;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.info(editProfile);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack direction='column' flexWrap='nowrap' gap={4}>
				<StackItem>
					<Card>
						{loading && <Spinner alignSelf='center' />}
						<Flex alignItems='flex-start' flexWrap='wrap'>
							{/* TODO Image uploader */}
							{image ? (
								<Image src={image} alt={`${name}'s picture`} loading='eager' fit='cover' w='xs' />
							) : (
								<Flex alignItems='center' justifyContent='center'>
									<FileInput name='image' label='Photo' />
								</Flex>
							)}
							<Stack flex='1' px={4} spacing={2}>
								<StackItem>
									<Heading variant='contentTitle'>Name</Heading>
									<Flex alignItems='baseline' gap={2}>
										<EditableTextInput
											defaultValue={firstName ? firstName : ''}
											as={Heading}
											mr={2}
											name='firstName'
											fontWeight='medium'
											placeholder='First'
											label='First Name'
											handleChange={handleEditableInputChange}
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
											handleChange={handleEditableInputChange}
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
											handleChange={handleEditableInputChange}
											outerProps={{ flex: '0 0 130px' }}
										/>
									</Flex>
								</StackItem>
								<StackItem>
									<Heading variant='contentTitle'>Details</Heading>
									<Flex gap={4}>
										<EditableTextInput
											defaultValue={selfTitle ? selfTitle : ''}
											name='title'
											placeholder='Title'
											label='Title/Trade/Profession'
											handleChange={handleEditableInputChange}
											outerProps={{ flex: '1 1 60%' }}
										/>
										<EditableTextInput
											defaultValue={location ? location : ''}
											name='location'
											placeholder='Location'
											label='Location/Homebase'
											handleChange={handleEditableInputChange}
											outerProps={{ flex: '1 1 40%' }}
										/>
										<Tag
											size='md'
											colorScheme={willTravel ? 'green' : 'orange'}
											mx={2}
											flex='0 0 130px'
										>
											{willTravelText()}
										</Tag>
									</Flex>
								</StackItem>
								<StackItem>
									<Heading variant='contentTitle'>Unions/Guilds</Heading>
									<Box fontSize='sm'>
										<ProfileCheckboxGroup filter='unions' items={unions} checked={[]} />
									</Box>
								</StackItem>
							</Stack>
						</Flex>

						<StackItem>
							<Flex alignItems='flex-start' gap={8}>
								<Box flex='1 1 50%'>
									<Heading variant='contentTitle'>Contact</Heading>
									<EditTextWithIcon
										value={email}
										icon={FiMail}
										label='Mail'
										labelVisuallyHidden
										name='email'
										handleChange={handleEditableInputChange}
									/>
									<EditTextWithIcon
										value={phone}
										icon={FiPhone}
										label='Phone'
										labelVisuallyHidden
										name='phone'
										handleChange={handleEditableInputChange}
									/>
								</Box>
								<Box flex='1 0 50%'>
									<Flex w='full' justifyContent='center'>
										<Flex gap={3} alignItems='center' flexWrap='wrap'>
											<Heading variant='contentTitle' flex='0 0 100%' textAlign='center'>
												Resume
											</Heading>
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
									</Flex>
								</Box>
							</Flex>
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
										handleChange={handleEditableInputChange}
									/>
									<EditTextWithIcon
										value={socials?.facebook}
										icon={FiFacebook}
										label='Facebook'
										labelVisuallyHidden
										name='facebook'
										handleChange={handleEditableInputChange}
									/>
									<EditTextWithIcon
										value={socials?.instagram}
										icon={FiInstagram}
										label='Instagram'
										labelVisuallyHidden
										name='instagram'
										handleChange={handleEditableInputChange}
									/>
									<EditTextWithIcon
										value={socials?.twitter}
										icon={FiTwitter}
										label='Twitter'
										labelVisuallyHidden
										name='twitter'
										handleChange={handleEditableInputChange}
									/>
									<EditTextWithIcon
										value={socials?.website}
										icon={FiGlobe}
										label='Website'
										labelVisuallyHidden
										name='website'
										handleChange={handleEditableInputChange}
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
							handleChange={handleEditableInputChange}
							placeholder="Write a little. Write a lot. It's up to you!"
						/>
					</Card>
					<Card>
						<Heading
							as='h3'
							size='md'
							fontWeight='medium'
							pb={2}
							color='blackAlpha.800'
							borderBottomWidth='3px'
							borderBottomStyle='dashed'
							borderBottomColor='gray.400'
						>
							The following <em>optional</em> fields will be searchable, but will not appear on your
							public profile.
						</Heading>
						<Flex>
							<Box flex='1 0 33%'>
								<Heading variant='contentTitle'>Gender Identity</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										filter='genderIdentity'
										items={genderIdentities}
										checked={[]}
									/>
								</Box>
							</Box>
							<Box flex='1 0 33%'>
								<Heading variant='contentTitle'>Racial Identity</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										filter='racialIdentity'
										items={racialIdentities}
										checked={[]}
									/>
								</Box>
							</Box>
							<Box flex='1 0 33%'>
								<Heading variant='contentTitle'>Personal Identity</Heading>
								<Box fontSize='sm'>
									<ProfileCheckboxGroup
										filter='personalIdentity'
										items={personalIdentities}
										checked={[]}
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
							handleChange={handleEditableInputChange}
						/>
					</Card>
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.cyan'>Media</HeadingCenterline>
					<Stack direction='column' mt={4} w='full' flexWrap='wrap' gap={2}>
						{media?.map((item: string, index: React.Key) => (
							<Box key={index}>
								<ReactPlayer url={item} controls={true} />
							</Box>
						))}
					</Stack>
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.cyan'>Credits</HeadingCenterline>
					{credits?.map((credit: Credit, index: Key) => (
						<CreditItem key={index} credit={credit} />
					))}
				</StackItem>
			</Stack>
		</form>
	);
}
