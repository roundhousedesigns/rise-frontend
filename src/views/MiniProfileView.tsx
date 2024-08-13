import {
	Heading,
	Flex,
	Text,
	Stack,
	Card,
	Tag,
	StackItem,
	ButtonGroup,
	Button,
	Avatar,
	Box,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiUser, FiEdit3 } from 'react-icons/fi';
import { UserProfile } from '@lib/classes';
import useViewer from '@queries/useViewer';
import { useProfileCompletion, useProfileUrl } from '../hooks/hooks';
import ShareButton from '../components/common/ShareButton';
import RiseStar from '../components/common/icons/RiseStar';
import ProfilePercentComplete from '../components/ProfilePercentComplete';

interface Props {
	profile: UserProfile;
	allowStar?: boolean;
	[prop: string]: any;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function MiniProfileView({
	profile,
	allowStar = true,
	...props
}: Props): JSX.Element {
	const [{ loggedInSlug, loggedInId }] = useViewer();

	const { image, pronouns, selfTitle, homebase } = profile || {};

	const percentComplete = useProfileCompletion(loggedInId);

	const profileUrl = useProfileUrl(loggedInSlug);

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

	const barColor = () => {
		// Set the color based on the percentage. 0 to 33 is red, 34 to 66 is yellow, 67 to 100 is green.
		if (percentComplete < 34) return 'red';
		if (percentComplete < 67) return 'yellow';
		return 'blue';
	};

	return profile ? (
		<Card px={4} align='center' {...props}>
			<Box position='absolute' top={2} right={2}>
				<ShareButton url={profileUrl} />
			</Box>
			<Stack direction='column' lineHeight={1} w='full'>
				{image ? (
					<StackItem textAlign='center'>
						<Avatar size='superLg' src={image} name={profile.fullName()} />
					</StackItem>
				) : null}
				<StackItem
					flexWrap='wrap'
					justifyContent={{ base: 'center', md: 'flex-start' }}
					alignItems='center'
				>
					<Flex justifyContent='center' flexWrap='wrap' gap={2}>
						<Heading size='lg' m={0} fontWeight='bold' lineHeight='none'>
							{profile.fullName()}
						</Heading>
						{pronouns ? (
							<Tag colorScheme='blue' size='md'>
								{pronouns}
							</Tag>
						) : null}
					</Flex>
				</StackItem>

				<StackItem as={ProfileSubtitle} textAlign='center' fontSize='md' my={0} />

				{percentComplete < 100 ? (
					<StackItem as={RiseStar} textAlign='center' my={2} color='brand.orange' />
				) : null}

				<StackItem textAlign={'right'}>
					{percentComplete < 100 ? <ProfilePercentComplete colorScheme={barColor()} /> : null}

					<ButtonGroup size='xs' mt={2}>
						<Button
							as={RouterLink}
							leftIcon={<FiUser />}
							to={`/profile/${loggedInSlug}`}
							colorScheme='blue'
							my={0}
						>
							View
						</Button>
						<Button
							as={RouterLink}
							leftIcon={<FiEdit3 />}
							to='/profile/edit'
							colorScheme='green'
							my={0}
						>
							Edit
						</Button>
					</ButtonGroup>
				</StackItem>
			</Stack>
		</Card>
	) : (
		<></>
	);
}
