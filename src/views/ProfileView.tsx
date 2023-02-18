import { Key } from 'react';
import {
	Box,
	Heading,
	Image,
	Flex,
	Text,
	ButtonGroup,
	Button,
	Stack,
	ListItem,
	Card,
	Avatar,
	Tag,
	Spinner,
	UnorderedList,
	useMediaQuery,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { isEmpty } from 'lodash';
import { Credit, UserProfile } from '../lib/classes';
import HeadingCenterline from '../components/common/HeadingCenterline';
import SocialLinks from '../components/common/SocialLinks';
import CreditItem from '../components/common/CreditItem';
import TextInput from '../components/common/inputs/TextInput';
import TextareaInput from '../components/common/inputs/TextareaInput';

interface Props {
	profile: UserProfile | null;
	loading: boolean;
	editable: boolean;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The profile view.
 */
export default function ProfileView({ profile, loading, editable }: Props): JSX.Element | null {
	const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

	/**
	 * Generate the text to display for the 'will travel' field.
	 * @returns {string} The text to display.
	 */
	const willTravelText = (): string => {
		const str = 'Willing to travel';
		return profile?.willTravel ? str : `Not ${str.toLowerCase()}`;
	};

	return profile ? (
		<Stack direction='column' flexWrap='nowrap' gap={6}>
			<Card py={6} bg='blackAlpha.100' gap={4}>
				<Flex
					gap={5}
					flexWrap={{ base: 'wrap', md: 'nowrap' }}
					justifyContent={{ base: 'center', md: 'flex-start' }}
				>
					{loading && <Spinner alignSelf='center' />}
					{isLargerThanMd ? (
						profile.image ? (
							<Image
								src={profile.image}
								alt={`${profile.name}'s picture`}
								loading='eager'
								fit='cover'
								w='xs'
							/>
						) : (
							<Avatar size='2xl' name={`${profile.name}'s picture`} mx={2} />
						)
					) : (
						<Avatar size='2xl' src={profile.image} name={`${profile.name}'s picture`} />
					)}

					<Box>
						<Flex alignItems='center'>
							<TextInput
								defaultValue={profile.name}
								editable={editable}
								as={Heading}
								mr={2}
								fontWeight='medium'
								placeholder='your name'
							/>

							{/* TODO `Tag` Editable sucks right now. */}
							<TextInput
								defaultValue={profile.pronouns ? profile.pronouns : ''}
								editable={editable}
								as={Tag}
								bg='cyan.200'
								fontSize='xs'
								placeholder='your pronouns'
								styles={{ display: 'block' }}
							/>
						</Flex>

						<TextInput
							defaultValue={profile.selfTitle ? profile.selfTitle : ''}
							editable={editable}
							as={Text}
							placeholder='your profession or title'
						/>

						{profile.socials && (!isEmpty(profile.socials) || !isEmpty(profile.websiteUrl)) && (
							<Box pb={3}>
								{/* TODO Edit social links inline */}
								<SocialLinks socials={profile.socials} websiteUrl={profile.websiteUrl} />
							</Box>
						)}

						<Box>
							<Heading size='md'>Unions/Guilds</Heading>
							<Text>{profile.unions?.join(', ')}</Text>
						</Box>
						<Stack direction='row' flexWrap='wrap' alignItems='flex-end'>
							<Box w='auto'>
								<Heading size='md'>Location/Homebase</Heading>
								<Stack direction='row' justifyContent='flex-start' alignItems='center'>
									<Text my={1} flex='1' mr={2}>
										{profile.location}
									</Text>
									{profile.willTravel !== undefined && (
										<Tag size='md' colorScheme={profile.willTravel ? 'green' : 'orange'}>
											{willTravelText()}
										</Tag>
									)}
								</Stack>
							</Box>
						</Stack>
						<ButtonGroup
							colorScheme='blue'
							flexWrap='wrap'
							gap={2}
							justifyContent='flex-start'
							pt={2}
						>
							<Button>Resume{/* profile.resume */}</Button>
							<Button>Email{/* profile.email */}</Button>
							<Button>Phone{/* profile.phone */}</Button>
							<Button>Save{/* bookmark this user */}</Button>
						</ButtonGroup>
					</Box>
				</Flex>
				{editable && (
					<Box bg='whiteAlpha.600' flex='1 1 25%' borderRadius='lg' p={4}>
						<Heading size='md' textAlign='left' color='blackAlpha.700'>
							Personal Info
						</Heading>
						<Text fontSize='sm'>
							These optional fields will be searchable, but will not appear on your public profile.
						</Text>
					</Box>
				)}
			</Card>

			{profile.credits && profile.credits.length > 0 && (
				// MAYBE click-to-expand more Credit details?
				<Box>
					<HeadingCenterline lineColor='brand.cyan'>Credits</HeadingCenterline>
					{profile.credits.map((credit: Credit, index: Key) => (
						<CreditItem key={index} credit={credit} />
					))}
				</Box>
			)}

			{profile.description && (
				<Box>
					<HeadingCenterline lineColor='brand.pink'>About</HeadingCenterline>
					<TextareaInput defaultValue={profile.description} editable={editable} />
				</Box>
			)}

			{profile.education && (
				<Box>
					<HeadingCenterline lineColor='brand.green'>Education + Training</HeadingCenterline>
					<UnorderedList textAlign='left' fontSize='lg' spacing={1} mt={2}>
						{profile.education.map((item: string, index: React.Key) => (
							<ListItem key={index}>{item}</ListItem>
						))}
					</UnorderedList>
				</Box>
			)}

			{profile.media && profile.media.length > 0 && (
				<Box>
					<HeadingCenterline lineColor='brand.cyan'>Media</HeadingCenterline>
					<Stack direction='column' mt={4} w='full' flexWrap='wrap' gap={2}>
						{profile.media.map((item: string, index: React.Key) => (
							// TODO Improve video display w/ responsiveness and grid
							<Box key={index}>
								<ReactPlayer url={item} controls={true} />
							</Box>
						))}
					</Stack>
				</Box>
			)}
		</Stack>
	) : null;
}
