import { Key } from 'react';
import { useParams } from 'react-router-dom';
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
	List,
	ListItem,
	Link,
	Button,
	Wrap,
	SimpleGrid,
	Icon,
	useBreakpointValue,
	Spacer,
} from '@chakra-ui/react';
import {
	FiMail,
	FiMapPin,
	FiPhone,
	FiStar,
	FiUser,
	FiLink,
	FiMap,
	FiExternalLink,
	FiGlobe,
} from 'react-icons/fi';
import ReactPlayer from 'react-player/lazy';
import { getWPItemsFromIds } from '@lib/utils';
import { Credit, UserProfile, WPItem } from '@lib/classes';
import useUserTaxonomies from '@queries/useUserTaxonomies';
import useResumePreview from '@queries/useResumePreview';
import StarToggleIcon from '@common/StarToggleIcon';
import LinkWithIcon from '@common/LinkWithIcon';
import WrapWithIcon from '@common/WrapWithIcon';
import ProfileStackItem from '@common/ProfileStackItem';
import ResumePreviewModal from '@components/ResumePreviewModal';
import CreditsTagLegend from '@components/CreditsTagLegend';
import PersonalIconLinks from '@components/PersonalIconLinks';
import CreditItem from '@components/CreditItem';
import ConflictDateRanges from '@components/ConflictDateRanges';

interface Props {
	profile: UserProfile;
	allowStar?: boolean;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function ProfileView({ profile, allowStar = true }: Props): JSX.Element | null {
	const params = useParams();

	const slug = params.slug ? params.slug : '';

	const isLargerThanMd = useBreakpointValue(
		{
			base: false,
			sm: true,
		},
		{ ssr: false }
	);

	const {
		id,
		image,
		pronouns,
		selfTitle,
		homebase,
		locations,
		website,
		languages,
		socials,
		unions,
		partnerDirectories,
		willTravel,
		willTour,
		email,
		phone,
		resume,
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
		conflictRanges,
		credits,
	} = profile || {};

	// Ensure media videos are unique
	const mediaVideos = Array.from(new Set([mediaVideo1, mediaVideo2].filter(Boolean)));

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

	const { attachment } = useResumePreview(resume ? resume : '');

	interface SelectedTermsProps {
		ids: number[];
		terms: WPItem[];
	}

	// Selected term items.
	const SelectedTerms = ({ ids, terms }: SelectedTermsProps) => {
		const items = getWPItemsFromIds(ids, terms);

		return items ? (
			<Flex gap={1} flexWrap='wrap'>
				{items.map((item: WPItem) => (
					<Tag key={item.id}>{item.name}</Tag>
				))}
			</Flex>
		) : null;
	};

	function selectedLinkableTerms({
		ids,
		terms,
	}: {
		ids: number[];
		terms: WPItem[];
	}): (JSX.Element | null)[] {
		return getWPItemsFromIds(ids, terms).map((term: WPItem) => {
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
						leftIcon={<FiLink />}
					>
						{term.name}
					</Button>
				);
			}

			return null;
		});
	}

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
			<Heading as='h2' size='sm' fontWeight='medium' {...props}>
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
			<ProfileStackItem as={Card} p={4} mt={2}>
				{id && allowStar && !isLargerThanMd ? (
					<StarToggleIcon id={id} mx={{ base: 0 }} borderRadius='md' size='lg' />
				) : null}
				<Flex
					gap={6}
					flexWrap={{ base: 'wrap', sm: 'nowrap' }}
					justifyContent={{ base: 'center', sm: 'flex-start' }}
				>
					{isLargerThanMd ? (
						<Stack direction='column' w={'40%'} minW='160px' maxW='400px' textAlign='center'>
							{image ? (
								<Box position='relative' m={1}>
									<Box
										bg='brand.orange'
										borderRadius='md'
										w='full'
										h='full'
										transform='translate(12px, 12px)'
										position='absolute'
										top={0}
										left={0}
									/>
									<Box
										bg='brand.yellow'
										borderRadius='md'
										w='full'
										h='full'
										transform='translate(7px, 7px)'
										position='absolute'
										top={0}
										left={0}
									/>
									<Box
										bg='brand.blue'
										borderRadius='md'
										w='full'
										h='full'
										transform='translate(3px, 3px)'
										position='absolute'
										top={0}
										left={0}
									/>
									<Image
										src={image}
										alt={`${profile.fullName()}'s picture`}
										borderRadius='md'
										borderWidth='2px'
										borderStyle='solid'
										borderColor='brand.blue'
										loading='eager'
										fit='cover'
										w='full'
										transform='translate(0, 0)'
									/>
								</Box>
							) : (
								<Avatar size='2xl' name={profile.fullName()} mx={2} />
							)}

							{!socials.isEmpty() ? (
								<PersonalIconLinks
									socials={socials}
									profileSlug={slug}
									boxSize={10}
									justifyContent='center'
								/>
							) : null}

							{email || phone || website ? (
								<ProfileStackItem title='Contact'>
									<List mt={0} spacing={1}>
										{email ? (
											<ListItem>
												<LinkWithIcon href={`mailto:${email}`} icon={FiMail}>
													{email}
												</LinkWithIcon>
											</ListItem>
										) : null}
										{phone ? (
											<ListItem>
												<LinkWithIcon href={`tel:${phone}`} icon={FiPhone}>
													{phone}
												</LinkWithIcon>
											</ListItem>
										) : null}
										{website ? (
											<ListItem>
												<LinkWithIcon href={website} target='_blank' icon={FiExternalLink}>
													Visit Website
												</LinkWithIcon>
											</ListItem>
										) : null}
									</List>
								</ProfileStackItem>
							) : null}

							{resume && attachment?.sourceUrl ? (
								<ProfileStackItem title='Resume'>
									<Flex gap={2}>
										<ResumePreviewModal
											resumePreviewSrc={attachment.sourceUrl}
											resumeLink={resume}
											previewIcon={false}
											maxW='250px'
										/>
									</Flex>
								</ProfileStackItem>
							) : null}

							{conflictRanges.length ? (
								<Card pb={0} _dark={{ bg: 'gray.600' }} _light={{ bg: 'gray.200' }}>
									<Box>
										<Heading as='h3' variant='contentTitle'>
											Schedule Conflicts
										</Heading>
										<ConflictDateRanges my={4} conflictRanges={conflictRanges} />
									</Box>
								</Card>
							) : null}
						</Stack>
					) : (
						<Avatar size='superLg' src={image} name={profile.fullName()} />
					)}

					{id && allowStar && isLargerThanMd ? (
						<StarToggleIcon
							id={id}
							mx={{ base: 0 }}
							borderRadius='md'
							size='lg'
							pos='absolute'
							top={2}
							right={2}
						/>
					) : (
						false
					)}

					<Stack
						direction='column'
						justifyContent={'flex-start'}
						gap={6}
						width={'100%'}
						lineHeight={1}
					>
						<Box>
							<Flex
								justifyContent={{ base: 'center', sm: 'space-between' }}
								w='full'
								flexWrap='wrap'
								alignItems='flex-end'
							>
								<Heading as='h1' size='xl' pt={4} mr={2} my={0} fontWeight='bold' lineHeight='none'>
									{profile.fullName()}
								</Heading>
								{pronouns ? (
									<Tag
										colorScheme='blue'
										size='md'
										mt={{ base: 2, sm: 'initial' }}
										position='relative'
										bottom={{ base: 0, sm: 1 }}
									>
										{pronouns}
									</Tag>
								) : null}
								<Spacer flex={1} />
							</Flex>
							<ProfileSubtitle flex={'0 0 100%'} w='full' />
						</Box>

						{locations && locations.length > 0 ? (
							<ProfileStackItem title={'Works in'}>
								<>
									<WrapWithIcon icon={FiMapPin} mr={2}>
										{locationTerms ? SelectedTerms({ ids: locations, terms: locationTerms }) : null}
									</WrapWithIcon>
									<WrapWithIcon icon={FiMap} mr={2}>
										<Wrap>
											{willTravel !== undefined && (
												<Tag size='md' colorScheme={willTravel ? 'green' : 'orange'}>
													{willTravel ? 'Will Travel' : 'Local Only'}
												</Tag>
											)}
											{willTour !== undefined && (
												<Tag size='md' colorScheme={willTour ? 'green' : 'orange'}>
													{willTour ? 'Will Tour' : 'No Tours'}
												</Tag>
											)}
										</Wrap>
									</WrapWithIcon>
								</>
							</ProfileStackItem>
						) : null}

						{unions && unions.length > 0 && unionTerms ? (
							<ProfileStackItem title={'Unions/Guilds/Memberships'}>
								<WrapWithIcon icon={FiUser}>
									{SelectedTerms({ ids: unions, terms: unionTerms })}
								</WrapWithIcon>
							</ProfileStackItem>
						) : null}

						{partnerDirectories && partnerDirectories.length > 0 && partnerDirectoryTerms ? (
							<ProfileStackItem title={'RISE Network Partner Directories'}>
								<Flex alignItems='center' flexWrap='nowrap' justifyContent={'space-between'}>
									<Icon as={FiStar} boxSize={4} flex={'0 0 auto'} />
									<Wrap flex='1' pl={2} spacing={2}>
										{selectedLinkableTerms({
											ids: partnerDirectories,
											terms: partnerDirectoryTerms,
										})}
									</Wrap>
								</Flex>
							</ProfileStackItem>
						) : null}

						{conflictRanges.length && !isLargerThanMd ? (
							<ProfileStackItem title='Conflicts'>
								<ConflictDateRanges my={4} conflictRanges={conflictRanges} />
							</ProfileStackItem>
						) : null}

						{languages ? (
							<ProfileStackItem title={'Additional Languages'} my={2}>
								<WrapWithIcon icon={FiGlobe} m={0}>
									<Text m={0}>{languages}</Text>
								</WrapWithIcon>
							</ProfileStackItem>
						) : null}
					</Stack>
				</Flex>
			</ProfileStackItem>

			{credits && credits.length > 0 && (
				<ProfileStackItem centerlineColor={'brand.blue'} title='Credits'>
					<>
						<Flex justifyContent={'flex-end'}>
							<CreditsTagLegend mr={4} />
						</Flex>
						<List m={0}>
							{creditsSorted.map((credit: Credit) => (
								<ListItem key={credit.id}>
									<CreditItem credit={credit} />
								</ListItem>
							))}
						</List>
					</>
				</ProfileStackItem>
			)}

			{description && (
				<ProfileStackItem centerlineColor={'brand.orange'} title='About'>
					<Text whiteSpace={'pre-wrap'} borderRadius='md'>
						{description.trim()}
					</Text>
				</ProfileStackItem>
			)}

			{education && (
				<ProfileStackItem centerlineColor={'brand.green'} title={'Education + Training'}>
					<Text whiteSpace={'pre-wrap'} borderRadius='md'>
						{education.trim()}
					</Text>
				</ProfileStackItem>
			)}

			{mediaVideos.length > 0 || mediaImages.length > 0 ? (
				<ProfileStackItem centerlineColor={'brand.blue'} title='Media'>
					<>
						{mediaVideos.length > 0 ? (
							<>
								<Heading as='h3' variant='contentTitle' size='md'>
									Video
								</Heading>
								<SimpleGrid columns={[1, 2]} mt={4} spacing={4}>
									{mediaVideos.map((video: string | undefined) => {
										if (!video) return false;
										return (
											// Videos are unique, so we can just use the string as the key.
											<Box key={video} position='relative' paddingBottom={'56.25%'}>
												<Box position='absolute' top={0} left={0} width={'100%'} height={'100%'}>
													<ReactPlayer url={video} controls width={'100%'} height={'100%'} />
												</Box>
											</Box>
										);
									})}
								</SimpleGrid>
							</>
						) : null}
						{mediaImages.length > 0 ? (
							<Box mt={6}>
								<Heading as='h3' variant='contentTitle' size='md'>
									Images
								</Heading>

								<Box w='full' sx={{ columnCount: [1, 2, 3], columnGap: '8px' }}>
									{mediaImages.map((image: string | undefined, index: Key) => (
										<Image
											key={index}
											src={image}
											borderRadius='md'
											fit='cover'
											mb={2}
											alt={`${profile.fullName()}'s image`}
										/>
									))}
								</Box>
							</Box>
						) : null}
					</>
				</ProfileStackItem>
			) : null}
		</Stack>
	) : null;
}
