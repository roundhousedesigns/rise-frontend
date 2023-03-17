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
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { FiDownload, FiMail, FiMapPin, FiPhone, FiUsers } from 'react-icons/fi';
import { Credit, UserProfile, WPItem } from '../lib/classes';
import useUserTaxonomies from '../hooks/queries/useUserTaxonomies';
import HeadingCenterline from '../components/common/HeadingCenterline';
import LinkWithIcon from '../components/common/LinkWithIcon';
import PersonalIconLinks from '../components/common/PersonalIconLinks';
import CreditItem from '../components/common/CreditItem';
import TextWithIcon from '../components/common/TextWithIcon';
import { getWPItemsFromIds } from '../lib/utils';

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
		socials,
		unions,
		locations,
		willTravel,
		email,
		phone,
		resume,
		credits,
		description,
		media,
		education,
	} = profile || {};

	const creditsSorted = credits
		? credits.sort((a: Credit, b: Credit) => (a.year > b.year ? -1 : 1))
		: [];

	const [{ locations: locationTerms, unions: unionTerms }] = useUserTaxonomies();

	const selectedTerms = (ids: number[], terms: WPItem[]) =>
		getWPItemsFromIds(ids, terms)
			.map((term: WPItem) => term.name)
			.join(', ');

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
								<Tag colorScheme='cyan' size='md'>
									{pronouns}
								</Tag>
								<Text flex='0 0 100%' fontSize='xl' lineHeight='short' mt={2} mb={0}>
									{selfTitle && selfTitle}
								</Text>
							</StackItem>
							{socials && !isEmpty(socials) && (
								<StackItem>
									<PersonalIconLinks socials={socials} />
								</StackItem>
							)}
							<StackItem>
								<Heading variant='contentTitle'>Location/Homebase</Heading>
								<Flex alignItems='center'>
									<TextWithIcon icon={FiUsers}>
										{locations && locationTerms ? selectedTerms(locations, locationTerms) : 'None'}
									</TextWithIcon>
									{willTravel !== undefined && (
										<Tag size='md' colorScheme={willTravel ? 'green' : 'orange'} ml={2}>
											{willTravel ? 'Will Travel' : 'Local Only'}
										</Tag>
									)}
								</Flex>
							</StackItem>
							<StackItem>
								<Heading variant='contentTitle'>Unions/Guilds</Heading>
								<TextWithIcon icon={FiUsers}>
									{unions && unionTerms ? selectedTerms(unions, unionTerms) : 'None'}
								</TextWithIcon>
							</StackItem>
							<StackItem>
								<Heading variant='contentTitle'>Contact</Heading>
								<UnorderedList listStyleType='none' m={0}>
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
									{resume ? (
										<ListItem>
											<LinkWithIcon href={resume} icon={FiDownload} isExternal>
												Resume
											</LinkWithIcon>
										</ListItem>
									) : null}
								</UnorderedList>
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
					<HeadingCenterline lineColor='brand.cyan'>Credits</HeadingCenterline>
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
					<Text>{description}</Text>
				</Box>
			)}

			{education && (
				<Box>
					<HeadingCenterline lineColor='brand.green'>Education + Training</HeadingCenterline>
					<Text whiteSpace='pre-wrap'>{education.trim()}</Text>
				</Box>
			)}

			{media && media.length > 0 && (
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
			)}
		</Stack>
	) : null;
}
