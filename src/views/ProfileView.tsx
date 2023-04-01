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
} from '@chakra-ui/react';
// import ReactPlayer from 'react-player';
import { FiDownload, FiGlobe, FiMail, FiMapPin, FiPhone, FiUser } from 'react-icons/fi';
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
		// media,
		education,
	} = profile || {};

	const creditsSorted = credits
		? credits.sort((a: Credit, b: Credit) => (a.index > b.index ? 1 : -1))
		: [];

	const [{ locations: locationTerms, unions: unionTerms }] = useUserTaxonomies();

	const selectedTerms = (ids: number[], terms: WPItem[]) =>
		getWPItemsFromIds(ids, terms)
			.map((term: WPItem) => term.name)
			.join(', ');

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
									<Tag colorScheme='cyan' size='md'>
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
									<TextWithIcon icon={FiMapPin}>
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
										bgColor='teal'
										color='white'
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
					<HeadingCenterline lineColor='brand.cyan' mb={1}>
						Credits
					</HeadingCenterline>
					<Flex justifyContent='flex-end'>
						<CreditsTagLegend />
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
				<Box>
					<HeadingCenterline lineColor='brand.pink'>About</HeadingCenterline>
					<Text whiteSpace='pre-wrap'>{description.trim()}</Text>
				</Box>
			)}

			{education && (
				<Box>
					<HeadingCenterline lineColor='brand.green'>Education + Training</HeadingCenterline>
					<Text whiteSpace='pre-wrap'>{education.trim()}</Text>
				</Box>
			)}

			{/* {media && media.length > 0 && (
				<Box>
					<HeadingCenterline lineColor='brand.cyan'>Media</HeadingCenterline>
					<Stack direction='column' mt={4} w='full' flexWrap='wrap' gap={2}>
						{media.map((item: string, index: Key) => (
							// TODO Improve video display w/ responsiveness and grid
							<Box key={index}>
								<ReactPlayer url={item} controls={true} />
							</Box>
						))}
					</Stack>
				</Box>
			)} */}
		</Stack>
	) : null;
}
