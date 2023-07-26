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
	Icon,
	TagLeftIcon,
	TagLabel,
} from '@chakra-ui/react';
import {
	FiBriefcase,
	FiCompass,
	FiDownload,
	FiGlobe,
	FiMail,
	FiMapPin,
	FiPhone,
	FiStar,
	FiUser,
} from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { getWPItemsFromIds } from '../lib/utils';
import { Credit, UserProfile, WPItem } from '../lib/classes';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import CreditsTagLegend from '../components/CreditsTagLegend';
import HeadingCenterline from '../components/common/HeadingCenterline';
import LinkWithIcon from '../components/common/LinkWithIcon';
import PersonalIconLinks from '../components/PersonalIconLinks';
import CreditItem from '../components/CreditItem';
import TextWithIcon from '../components/common/TextWithIcon';

interface Props {
	profile: UserProfile | null;
	loading: boolean;
}

// TODO Chore: create stack item component for profile to DRY yourself off

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
		partnerDirectories,
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

	const [
		{ locations: locationTerms, unions: unionTerms, partnerDirectories: partnerDirectoryTerms },
	] = useUserTaxonomies();

	const selectedTerms = (ids: number[], terms: WPItem[]) =>
		getWPItemsFromIds(ids, terms)
			.map((term: WPItem) => term.name)
			.join(', ');

	const selectedLinkableTerms = (ids: number[], terms: WPItem[]) =>
		getWPItemsFromIds(ids, terms).map((term: WPItem) => {
			if (term.externalUrl) {
				return (
					<Button
						as={Link}
						key={term.id}
						href={term.externalUrl}
						isExternal
						size='sm'
						m={0}
						colorScheme='orange'
					>
						{term.name}
					</Button>
				);
			}

			return term.name;
		});

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
			<Heading as='h2' size='md' mt={2} fontWeight='medium' {...props}>
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
				<Card p={4}>
					<Flex
						gap={6}
						flexWrap={{ base: 'wrap', md: 'nowrap' }}
						justifyContent={{ base: 'center', md: 'flex-start' }}
					>
						{loading && <Spinner alignSelf='center' />}
						{isLargerThanMd ? (
							image ? (
								<Box w='40%' minW='160px' maxW='400px'>
									<Image
										src={image}
										alt={`${profile.fullName()}'s picture`}
										borderRadius='md'
										loading='eager'
										fit='cover'
										w='full'
									/>
								</Box>
							) : (
								<Avatar size='2xl' name={profile.fullName()} mx={2} />
							)
						) : (
							<Avatar size='superLg' src={image} name={profile.fullName()} />
						)}

						<Stack direction='column' justifyContent='space-evenly' gap={4} lineHeight={1}>
							<StackItem display='flex' flexWrap='wrap'>
								<Heading as='h1' size='xl' mr={2} my={0} lineHeight='none'>
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

							{locations && locations.length > 0 ? (
								<StackItem>
									<Heading as='h3' variant='contentTitle'>
										Works In
									</Heading>
									<TextWithIcon icon={FiMapPin} mr={2}>
										{locationTerms ? selectedTerms(locations, locationTerms) : false}
									</TextWithIcon>
									<Wrap>
										{willTravel !== undefined && (
											<Tag
												size='md'
												colorScheme={willTravel ? 'green' : 'orange'}
												textAlign='center'
											>
												<TagLeftIcon as={FiBriefcase} boxSize={3} />
												<TagLabel>{willTravel ? 'Will Travel' : 'Local Only'}</TagLabel>
											</Tag>
										)}
										{willTour !== undefined && (
											<Tag size='md' colorScheme={willTour ? 'green' : 'orange'} textAlign='center'>
												<TagLeftIcon as={FiCompass} boxSize={3} />
												<TagLabel>{willTour ? 'Will Tour' : 'No Tours'}</TagLabel>
											</Tag>
										)}
									</Wrap>
								</StackItem>
							) : (
								false
							)}

							{unions && unions.length > 0 && unionTerms ? (
								<StackItem>
									<Heading as='h3' variant='contentTitle'>
										Unions/Guilds
									</Heading>
									<TextWithIcon icon={FiUser}>{selectedTerms(unions, unionTerms)}</TextWithIcon>
								</StackItem>
							) : (
								false
							)}

							{partnerDirectories && partnerDirectories.length > 0 && partnerDirectoryTerms ? (
								<StackItem>
									<Heading as='h3' variant='contentTitle'>
										RISE Network Partner Directories
									</Heading>
									<Flex alignItems='center' flexWrap='nowrap' justifyContent='space-between'>
										<Icon as={FiStar} boxSize={4} flex='0 0 auto' />
										<Wrap flex='1' pl={2} spacing={2}>
											{selectedLinkableTerms(partnerDirectories, partnerDirectoryTerms)}
										</Wrap>
									</Flex>
								</StackItem>
							) : (
								false
							)}

							<StackItem>
								<Heading as='h3' variant='contentTitle'>
									Contact
								</Heading>
								<UnorderedList listStyleType='none' m={0} spacing={1}>
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
											<LinkWithIcon href={website} icon={FiGlobe} target='_blank'>
												Visit Website
											</LinkWithIcon>
										</ListItem>
									) : (
										false
									)}
								</UnorderedList>
							</StackItem>

							<StackItem>
								<Flex alignItems='center' justifyContent='space-between' flexWrap='wrap' gap={4}>
									{resume && (
										<Button
											href={resume}
											as={Link}
											flex='1 0 auto'
											textDecoration='none'
											colorScheme='green'
											leftIcon={<FiDownload />}
											download
											isExternal
											_hover={{
												textDecoration: 'none',
											}}
											size={{ base: 'md', md: 'lg' }}
										>
											Resume
										</Button>
									)}
									{socials && !isEmpty(socials) && (
										<PersonalIconLinks
											socials={socials}
											flex='1 0 auto'
											justifyContent={{ base: 'flex-start', md: 'flex-end' }}
										/>
									)}
								</Flex>
							</StackItem>

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
					<Text whiteSpace='pre-wrap' borderRadius='md'>
						{description.trim()}
					</Text>
				</StackItem>
			)}

			{education && (
				<StackItem>
					<HeadingCenterline lineColor='brand.green'>Education + Training</HeadingCenterline>
					<Text whiteSpace='pre-wrap' borderRadius='md'>
						{education.trim()}
					</Text>
				</StackItem>
			)}

			{mediaVideos.length > 0 || mediaImages.length > 0 ? (
				<StackItem>
					<HeadingCenterline lineColor='brand.blue'>Media</HeadingCenterline>
					{mediaVideos.length > 0 ? (
						<>
							<Heading as='h3' variant='contentTitle' size='md'>
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
							<Heading as='h3' variant='contentTitle' size='md'>
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
