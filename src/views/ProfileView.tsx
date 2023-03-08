import { Key } from 'react';
import { isEmpty } from 'lodash';
import {
	Box,
	Heading,
	Image,
	Flex,
	Text,
	Button,
	Stack,
	Card,
	useMediaQuery,
	Avatar,
	Tag,
	Spinner,
	UnorderedList,
	ListItem,
	Link,
	Icon,
	Wrap,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { Credit, UserProfile } from '../lib/classes';
import HeadingCenterline from '../components/common/HeadingCenterline';
import SocialLinks from '../components/common/SocialLinks';
import CreditItem from '../components/common/CreditItem';
import { FiDownload, FiMail, FiPhone } from 'react-icons/fi';

interface Props {
	profile: UserProfile | null;
	loading: boolean;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function ProfileView({ profile, loading }: Props): JSX.Element | null {
	const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

	const {
		name,
		image,
		pronouns,
		selfTitle,
		socials,
		websiteUrl,
		unions,
		location,
		willTravel,
		email,
		phone,
		resume,
		credits,
		description,
		media,
		education,
	} = profile || {};

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
			<Card py={6} bg='blackAlpha.100'>
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

					<Stack direction='column' justifyContent='stretch' gap={1} lineHeight={1}>
						<Flex>
							<Heading size='xl' mr={2} lineHeight='none'>
								{name}
							</Heading>
							<Tag colorScheme='cyan' size='md'>
								{pronouns}
							</Tag>
						</Flex>
						<Box>
							<Text fontSize='xl' lineHeight='short' my={0}>
								{selfTitle && selfTitle}
							</Text>
						</Box>

						{socials && (!isEmpty(socials) || !isEmpty(websiteUrl)) && (
							<Box pb={3}>
								<SocialLinks socials={socials} websiteUrl={websiteUrl} />
							</Box>
						)}

						<Box>
							<Heading variant='contentTitle'>Unions/Guilds</Heading>
							<Text>{unions?.map((item) => item.name).join(', ')}</Text>
						</Box>
						<Box w='auto'>
							<Heading variant='contentTitle'>Location/Homebase</Heading>
							<Wrap justifyContent='flex-start' alignItems='center'>
								<Text pr={2}>{location}</Text>
								{willTravel !== undefined && (
									<Tag size='md' colorScheme={willTravel ? 'green' : 'orange'}>
										{willTravelText()}
									</Tag>
								)}
							</Wrap>
						</Box>
						<Heading variant='contentTitle'>Contact</Heading>
						<UnorderedList listStyleType='none' fontSize='md'>
							{email ? (
								<ListItem>
									<Link
										href={`mailto:${email} `}
										variant='dotted'
										display='flex'
										alignItems='center'
									>
										<Icon as={FiMail} mr={2} />
										{email}
									</Link>
								</ListItem>
							) : null}
							{phone ? (
								<ListItem>
									<Link href={`tel:${phone} `} variant='dotted' display='flex' alignItems='center'>
										<Icon as={FiPhone} mr={2} />
										{phone}
									</Link>
								</ListItem>
							) : null}
							{resume ? (
								<ListItem>
									<Link
										href={resume}
										variant='dotted'
										display='flex'
										alignItems='center'
										isExternal
									>
										<Icon as={FiDownload} mr={2} />
										Resume
									</Link>
								</ListItem>
							) : null}
							<Button>Save{/* bookmark this user */}</Button>
						</UnorderedList>
					</Stack>
				</Flex>
			</Card>

			{credits && credits.length > 0 && (
				// MAYBE click-to-expand more Credit details?
				<Box>
					<HeadingCenterline lineColor='brand.cyan'>Credits</HeadingCenterline>
					{credits.map((credit: Credit, index: Key) => (
						<CreditItem key={index} credit={credit} />
					))}
				</Box>
			)}

			{description && (
				<Box>
					<HeadingCenterline lineColor='brand.pink'>About</HeadingCenterline>
					<Text>{description}</Text>
				</Box>
			)}

			{education && (
				<Box>
					<HeadingCenterline lineColor='brand.green'>Education + Training</HeadingCenterline>
					<Text>{education}</Text>
				</Box>
			)}

			{media && media.length > 0 && (
				<Box>
					<HeadingCenterline lineColor='brand.cyan'>Media</HeadingCenterline>
					<Stack direction='column' mt={4} w='full' flexWrap='wrap' gap={2}>
						{media.map((item: string, index: React.Key) => (
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
