import React, { Key } from 'react';
import {
	Box,
	Heading,
	Image,
	Flex,
	Text,
	ButtonGroup,
	Button,
	Stack,
	List,
	ListItem,
	Card,
	useMediaQuery,
	Avatar,
	Tag,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { UserProfile } from '../lib/classes';
import HeadingCenterline from '../components/common/HeadingCenterline';
import SocialLinks from '../components/common/SocialLinks';

interface Props {
	profile: UserProfile;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function ProfileView({ profile }: Props): JSX.Element | null {
	const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

	return profile ? (
		<Stack direction="column" flexWrap="nowrap" gap={6}>
			<Card py={6} bg="blackAlpha.100" mb={2}>
				<Flex
					gap={5}
					flexWrap={{ base: 'wrap', md: 'nowrap' }}
					justifyContent={{ base: 'center', md: 'flex-start' }}
				>
					{isLargerThanMd ? (
						<Image
							src={profile.image}
							alt={`${profile.name}'s picture`}
							loading="eager"
							fit="cover"
						/>
					) : (
						<Avatar
							size="2xl"
							src={profile.image}
							name={`${profile.name}'s picture`}
						/>
					)}

					<Stack
						direction="column"
						textAlign="left"
						justifyContent="center"
						h="full"
					>
						<Flex alignItems="center">
							<Heading size="xl" mr={2}>
								{profile.name}
							</Heading>
							<Tag colorScheme="cyan" size="sm">
								{profile.pronouns}
							</Tag>
						</Flex>
						<Box>
							<Text fontSize="xl" lineHeight="short" margin={0}>
								{profile.jobList()}
							</Text>
						</Box>

						{profile.socials && !isEmpty(profile.socials) && (
							<Box pt={2} pb={4}>
								<SocialLinks
									socials={profile.socials}
									website={profile.website}
								/>
							</Box>
						)}

						<Box>
							<Heading size="md">Unions/Guilds</Heading>
							<Text>{profile.unionList()}</Text>
						</Box>
						<Box>
							<Heading size="md">Location/Homebase</Heading>
							<Text>{profile.location}</Text>
						</Box>
						<Box>
							<Heading size="md">Willing to travel</Heading>
							<Text>{profile.willTravel}</Text>
						</Box>
						<ButtonGroup
							colorScheme="blue"
							flexWrap="wrap"
							gap={2}
							justifyContent="flex-start"
						>
							<Button>Resume{/* profile.resume */}</Button>
							<Button>Email{/* profile.email */}</Button>
							<Button>Phone{/* profile.phone */}</Button>
							<Button>Save{/* bookmark this user */}</Button>
						</ButtonGroup>
					</Stack>
				</Flex>
			</Card>
			<Box mt={0}>
				<HeadingCenterline lineColor="brand.cyan">Credits</HeadingCenterline>
				<List textAlign="left" fontSize="lg" mt={2} spacing={1}>
					<ListItem>
						<Box as="span">Credit 1</Box> (Job Title) Venue, Year
					</ListItem>
					<ListItem>
						<Box as="span">Credit 2</Box> (Job Title) Venue, Year
					</ListItem>
					<ListItem>
						<Box as="span">Credit 3</Box> (Job Title) Venue, Year
					</ListItem>
				</List>
			</Box>
			<Box mt={0}>
				<HeadingCenterline lineColor="brand.pink">About</HeadingCenterline>
				<Text>
					Pirate Round port jolly boat fathom poop deck jack bilged on her
					anchor me flogging splice the main brace. Fire ship nipper quarter
					crack Jennys tea cup Sail ho brigantine plunder driver ye sheet. Bilge
					code of conduct flogging boom grapple starboard walk the plank blow
					the man down Jack Ketch lookout. Sail ho sutler piracy ye bilge rat
					landlubber or just lubber dance the hempen jig trysail bowsprit
					barkadeer.
				</Text>
				<Text>
					Lugger Corsair run a rig yardarm keel blow the man down tender careen
					interloper jack. Parrel rigging salmagundi hogshead pillage Jack Ketch
					reef sails nipperkin me lass. Barkadeer wench rum snow run a shot
					across the bow chantey fire in the hole poop deck brig man-of-war.
					Piracy square-rigged gaff to go on account Plate Fleet Jolly Roger jib
					trysail flogging Shiver me timbers. Keel lee capstan long boat lanyard
					me fore carouser tack driver.
				</Text>
			</Box>
			<Box mt={0}>
				<HeadingCenterline lineColor="brand.green">Education</HeadingCenterline>
				{profile.education && (
					<List textAlign="left" fontSize="lg" spacing={1} mt={2}>
						{profile.education.map((item: string, index: React.Key) => (
							<ListItem key={index}>{item}</ListItem>
						))}
					</List>
				)}
			</Box>
			<Box mt={0}>
				<HeadingCenterline lineColor="brand.cyan">Media</HeadingCenterline>
				<Text>-- video --</Text>
			</Box>
		</Stack>
	) : null;
}
