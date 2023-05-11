import { Key } from 'react';
import { isEmpty } from 'lodash';
import {
	Box,
	Heading,
	Image,
	Flex,
	Text,
	Stack,
	Card,
	useMediaQuery,
	Avatar,
	Tag,
	Spinner,
	UnorderedList,
	ListItem,
	StackItem,
	Link,
	Button,
	Wrap,
	SimpleGrid,
} from '@chakra-ui/react';
import { FiDownload, FiGlobe, FiMail, FiMapPin, FiPhone, FiUser } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { getWPItemsFromIds } from '../lib/utils';
import { Credit, UserProfile, WPItem } from '../lib/classes';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import CreditsTagLegend from '../components/CreditsTagLegend';
import HeadingCenterline from '../components/common/HeadingCenterline';
import LinkWithIcon from '../components/common/LinkWithIcon';
import PersonalIconLinks from '../components/common/PersonalIconLinks';
import CreditItem from '../components/common/CreditItem';
import TextWithIcon from '../components/common/TextWithIcon';

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
		image,
		pronouns,
		selfTitle,
		homebase,
		locations,
		website,
		socials,
		unions,
		willTravel,
		willTour,
		email,
		phone,
		resume,
		credits,
		description,
		mediaVideo1,
		mediaVideo2,
		mediaImage1,
		mediaImage2,
		mediaImage3,
		mediaImage4,
		mediaImage5,
		mediaImage6,
		education,
	} = profile || {};

	const mediaVideos = [mediaVideo1, mediaVideo2].filter((video) => !!video);
	const mediaImages = [
		mediaImage1,
		mediaImage2,
		mediaImage3,
		mediaImage4,
		mediaImage5,
		mediaImage6,
	].filter((image) => !!image);

	const creditsSorted = credits
		? credits.sort((a: Credit, b: Credit) => (a.index > b.index ? 1 : -1))
		: [];

	const [{ locations: locationTerms, unions: unionTerms }] = useUserTaxonomies();

	const selectedTerms = (ids: number[], terms: WPItem[]) =>
		getWPItemsFromIds(ids, terms)
			.map((term: WPItem) => term.name)
			.join(', ');

	// Build the subtitle string.
	const ProfileSubtitle = ({ ...props }: any) => {
		const SelfTitle = () => {
			return (
				<Text as='span' textDecoration='underline'>
					{selfTitle}
				</Text>
			);
		};
		const HomeBase = () => {
			return (
				<Text as='span' textDecoration='underline'>
					{homebase}
				</Text>
			);
		};

		return (
			<Heading size='md' mt={2} fontWeight='medium' {...props}>
				{selfTitle && homebase ? (
					<>
						<SelfTitle /> based in <HomeBase />
					</>
				) : (
					selfTitle || <HomeBase />
				)}
			</Heading>
		);
	};

	return profile ? (
		<Stack direction='column' flexWrap='nowrap' gap={6}>
			<StackItem>
				<Card py={6} bg='blackAlpha.100'>
					<Flex
						gap={5}
						flexWrap={{ base: 'wrap', md: 'nowrap' }}
						justifyContent={{ base: 'center', md: 'flex-start' }}
					>
						{loading && <Spinner alignSelf='center' />}
						{isLargerThanMd ? (
							image ? (
								<Image
									src={image}
									alt={`${profile.fullName()}'s picture`}
									loading='eager'
									fit='cover'
									w='xs'
								/>
							) : (
								<Avatar size='2xl' name={`${profile.fullName()}'s picture`} mx={2} />
							)
						) : (
							<Avatar size='2xl' src={image} name={`${profile.fullName()}'s picture`} />
						)}

						<Stack direction='column' justifyContent='stretch' gap={2} lineHeight={1}>
							<StackItem display='flex' flexWrap='wrap'>
								<Heading size='xl' mr={2} lineHeight='none'>
									{profile.fullName()}
								</Heading>
								{pronouns ? (
									<Tag colorScheme='blue' size='md'>
										{pronouns}
									</Tag>
								) : (
									false
								)}

								<ProfileSubtitle flex='0 0 100%' w='full' />
							</StackItem>
							<StackItem>
								<Heading variant='contentTitle'>Works In</Heading>
								<Flex alignItems='center'>
									<TextWithIcon icon={FiMapPin} mr={2}>
										{locations && locations.length > 0 && locationTerms
											? selectedTerms(locations, locationTerms)
											: false}
									</TextWithIcon>
									<Wrap>
										{willTravel !== undefined && (
											<Tag size='md' colorScheme={willTravel ? 'green' : 'orange'} ml={2}>
												{willTravel ? 'Will Travel' : 'Local Only'}
											</Tag>
										)}
										{willTour !== undefined && (
											<Tag size='md' colorScheme={willTour ? 'green' : 'orange'} ml={2}>
												{willTour ? 'Will Tour' : 'No Tours'}
											</Tag>
										)}
									</Wrap>
								</Flex>
							</StackItem>
							{unions && unions.length > 0 && unionTerms ? (
								<StackItem>
									<Heading variant='contentTitle'>Unions/Guilds</Heading>
									<TextWithIcon icon={FiUser}>{selectedTerms(unions, unionTerms)}</TextWithIcon>
								</StackItem>
							) : (
								false
							)}
							<StackItem>
								<Heading variant='contentTitle'>Contact</Heading>
								<UnorderedList listStyleType='none' m={0}>
									{email ? (
										<ListItem>
											<LinkWithIcon href={`mailto:${email}`} icon={FiMail}>
												{email}
											</LinkWithIcon>
										</ListItem>
									) : (
										false
									)}
									{phone ? (
										<ListItem>
											<LinkWithIcon href={`tel:${phone}`} icon={FiPhone}>
												{phone}
											</LinkWithIcon>
										</ListItem>
									) : (
										false
									)}
									{website ? (
										<ListItem>
											<LinkWithIcon href={website} icon={FiGlobe}>
												{website}
											</LinkWithIcon>
										</ListItem>
									) : (
										false
									)}
								</UnorderedList>
							</StackItem>

							{socials && !isEmpty(socials) && (
								<StackItem>
									<PersonalIconLinks socials={socials} />
								</StackItem>
							)}

							{resume ? (
								<StackItem>
									<Button
										href={resume}
										as={Link}
										colorScheme='green'
										leftIcon={<FiDownload />}
										download
										isExternal
										_hover={{
											textDecoration: 'none',
										}}
									>
										Resume
									</Button>
								</StackItem>
							) : (
								false
							)}

							{/* TODO Bookmark a user */}
							{/* <StackItem>
								<Button
									colorScheme='green'
									onClick={() => {
										alert('Pin!');
									}}
								>
									Save This Candidate
								</Button>
							</StackItem> */}
						</Stack>
					</Flex>
				</Card>
			</StackItem>

			{credits && credits.length > 0 && (
				<StackItem>
					<HeadingCenterline lineColor='brand.blue' mb={1}>
						Credits
					</HeadingCenterline>
					<Flex justifyContent='flex-end'>
						<CreditsTagLegend mr={4} />
					</Flex>
					<UnorderedList listStyleType='none' m={0}>
						{creditsSorted.map((credit: Credit) => (
							<ListItem key={credit.id}>
								<CreditItem credit={credit} />
							</ListItem>
						))}
					</UnorderedList>
				</StackItem>
			)}

			{description && (
				<StackItem>
					<HeadingCenterline lineColor='brand.orange'>About</HeadingCenterline>
					<Text whiteSpace='pre-wrap' bg='gray.100' borderRadius='md' p={4}>
						{description.trim()}
					</Text>
				</StackItem>
			)}

			{education && (
				<StackItem>
					<HeadingCenterline lineColor='brand.green'>Education + Training</HeadingCenterline>
					<Text whiteSpace='pre-wrap' bg='gray.100' borderRadius='md' p={4}>
						{education.trim()}
					</Text>
				</StackItem>
			)}

			{mediaVideos.length > 0 || mediaImages.length > 0 ? (
				<StackItem>
					<HeadingCenterline lineColor='brand.blue'>Media</HeadingCenterline>
					{mediaVideos.length > 0 ? (
						<>
							<Heading variant='contentTitle' size='md'>
								Video
							</Heading>
							<SimpleGrid columns={[1, 2]} mt={4} spacing={4}>
								{mediaVideos.map((video: string | undefined, index: Key) => {
									if (!video) return false;
									return (
										<Box key={index} position='relative' paddingBottom='56.25%'>
											<Box position='absolute' top={0} left={0} width='100%' height='100%'>
												<ReactPlayer url={video} controls width='100%' height='100%' />
											</Box>
										</Box>
									);
								})}
							</SimpleGrid>
						</>
					) : (
						false
					)}
					{mediaImages.length > 0 ? (
						<Box mt={6}>
							<Heading variant='contentTitle' size='md'>
								Images
							</Heading>

							<Box w='full' mx='auto' sx={{ columnCount: [1, 2, 3], columnGap: '8px' }}>
								{mediaImages.map((image: string | undefined, index: Key) => (
									// TODO add image captions
									<Image
										key={index}
										src={image}
										borderRadius='md'
										fit='cover'
										mb={2}
										// alt={`${profile.fullName()}'s picture`}
									/>
								))}
							</Box>
						</Box>
					) : (
						false
					)}
				</StackItem>
			) : (
				false
			)}
		</Stack>
	) : null;
}
