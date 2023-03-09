import { Key } from 'react';
import {
	Box,
	Heading,
	Image,
	Flex,
	Text,
	Stack,
	Card,
	Avatar,
	Tag,
	Spinner,
	useMediaQuery,
	StackItem,
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
	FiDownload,
	FiFacebook,
	FiGlobe,
	FiInstagram,
	FiLinkedin,
	FiMail,
	FiMapPin,
	FiPhone,
	FiTwitter,
} from 'react-icons/fi';
import EditTextWithIcon from '../components/common/EditTextWithIcon';

interface Props {
	profile: UserProfile | null;
	loading: boolean;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The profile view.
 */
export default function EditProfileView({ profile, loading }: Props): JSX.Element | null {
	const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');
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
	} = profile || {};

	const [{ genderIdentities, personalIdentities, racialIdentities, unions }] = useUserTaxonomies();

	/**
	 * Generate the text to display for the 'will travel' field.
	 *
	 * @returns {string} The text to display.
	 */
	const willTravelText = (): string => {
		const str = 'Willing to travel';
		return profile?.willTravel ? str : `Not ${str.toLowerCase()}`;
	};

	return profile ? (
		<form>
			<Stack direction='column' flexWrap='nowrap' gap={6}>
				<StackItem>
					<Card py={6} gap={4}>
						<Flex
							gap={5}
							flexWrap={{ base: 'wrap', md: 'nowrap' }}
							justifyContent={{ base: 'center', md: 'flex-start' }}
						>
							{loading && <Spinner alignSelf='center' />}
							{isLargerThanMd ? (
								image ? (
									<Image src={image} alt={`${name}'s picture`} loading='eager' fit='cover' w='xs' />
								) : (
									<Avatar size='2xl' name={`${name}'s picture`} mx={2} />
								)
							) : (
								<Avatar size='2xl' src={image} name={`${name}'s picture`} />
							)}

							<Stack direction='column' gap={4}>
								<StackItem>
									<Flex alignItems='flex-end'>
										<EditableTextInput
											defaultValue={firstName ? firstName : ''}
											as={Heading}
											mr={2}
											fontWeight='medium'
											placeholder='First'
											label='First Name'
										/>
										<EditableTextInput
											defaultValue={lastName ? lastName : ''}
											as={Heading}
											label='Last Name'
											mr={2}
											fontWeight='medium'
											placeholder='Last'
										/>
										<EditableTextInput
											defaultValue={pronouns ? pronouns : ''}
											as={Text}
											label='Pronouns'
											fontSize='xs'
											placeholder='your pronouns'
											styles={{ display: 'block' }}
										/>
									</Flex>

									<EditableTextInput
										defaultValue={selfTitle ? selfTitle : ''}
										placeholder='Title'
										label='Title/Trade/Profession'
									/>
								</StackItem>

								<StackItem>
									<Heading variant='contentTitle'>Social + Links</Heading>
									<EditTextWithIcon
										value={socials?.linkedin}
										icon={FiLinkedin}
										label='LinkedIn'
										labelVisuallyHidden={true}
									/>
									<EditTextWithIcon
										value={socials?.facebook}
										icon={FiFacebook}
										label='Facebook'
										labelVisuallyHidden={true}
									/>
									<EditTextWithIcon
										value={socials?.instagram}
										icon={FiInstagram}
										label='Instagram'
										labelVisuallyHidden={true}
									/>
									<EditTextWithIcon
										value={socials?.twitter}
										icon={FiTwitter}
										label='Twitter'
										labelVisuallyHidden={true}
									/>
									<EditTextWithIcon
										value={socials?.website}
										icon={FiGlobe}
										label='Website'
										labelVisuallyHidden={true}
									/>
								</StackItem>

								<StackItem>
									<Heading variant='contentTitle'>Unions/Guilds</Heading>
									<Box fontSize='sm'>
										<ProfileCheckboxGroup filter='unions' items={unions} checked={[]} />
									</Box>
								</StackItem>

								<StackItem>
									<Heading variant='contentTitle'>Location/Homebase</Heading>
									<Flex justifyContent='flex-start' alignItems='center'>
										<EditTextWithIcon
											value={location}
											icon={FiMapPin}
											label='Location/Homebase'
											labelVisuallyHidden={true}
										/>
										<Tag size='md' colorScheme={willTravel ? 'green' : 'orange'} mx={2}>
											{willTravelText()}
										</Tag>
									</Flex>
								</StackItem>

								<StackItem>
									<Heading variant='contentTitle'>Contact</Heading>
									<EditTextWithIcon
										value={email}
										icon={FiMail}
										label='Mail'
										labelVisuallyHidden={true}
									/>
									<EditTextWithIcon
										value={phone}
										icon={FiPhone}
										label='Phone'
										labelVisuallyHidden={true}
									/>
									<EditTextWithIcon
										value={resume}
										icon={FiDownload}
										label='PDF Resume'
										labelVisuallyHidden={true}
									/>
								</StackItem>
							</Stack>
						</Flex>
					</Card>
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.cyan'>Credits</HeadingCenterline>
					{credits?.map((credit: Credit, index: Key) => (
						<CreditItem key={index} credit={credit} />
					))}
				</StackItem>

				<StackItem>
					<HeadingCenterline lineColor='brand.pink'>About</HeadingCenterline>
					<EditableTextareaInput defaultValue={description ? description : ''} />
					<Card gap={4} mt={4} mb={2} py={4}>
						<Text fontSize='md' pb={2} color='blackAlpha.800'>
							These optional fields will be searchable, but will not appear on your public profile.
						</Text>
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
					<EditableTextareaInput defaultValue={education ? education : ''} />
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
			</Stack>
		</form>
	) : null;
}
