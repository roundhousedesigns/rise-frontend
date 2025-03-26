import {
	Heading,
	Flex,
	Text,
	Stack,
	Card,
	Tag,
	ButtonGroup,
	Button,
	Avatar,
	Box,
	CardProps,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiUser, FiEdit3 } from 'react-icons/fi';
import { UserProfile } from '@lib/classes';
import useViewer from '@queries/useViewer';
import { useProfileCompletion, useProfileUrl } from '@hooks/hooks';
import RiseStar from '@common/icons/RiseStar';
import TooltipIconButton from '@common/inputs/TooltipIconButton';
import ProfilePercentComplete from '@components/ProfilePercentComplete';

interface Props {
	profile: UserProfile;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function MiniProfileView({ profile, ...props }: Props & CardProps): JSX.Element {
	const [{ loggedInSlug, loggedInId, disableProfile }] = useViewer();

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

	return profile ? (
		<Card px={4} align='center' {...props}>
			<Stack direction='column' lineHeight={1} w='full'>
				{image ? (
					<Box textAlign='center'>
						<Avatar size='superLg' src={image} name={profile.fullName()} />
					</Box>
				) : null}
				<Box
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
				</Box>

				{percentComplete > 30 || disableProfile ? (
					<>
						<Box as={ProfileSubtitle} textAlign='center' fontSize='md' my={0} />

						{percentComplete < 100 && !!image ? (
							<Box as={RiseStar} textAlign='center' color={'brand.blue'} />
						) : null}

						<Box>
							{percentComplete < 100 ? <ProfilePercentComplete colorScheme='blue' /> : null}

							<ButtonGroup size='xs' mt={2}>
								<TooltipIconButton
									as={RouterLink}
									icon={<FiUser />}
									label={'View profile'}
									to={profileUrl}
									colorScheme='blue'
									my={0}
								>
									View
								</TooltipIconButton>
								<TooltipIconButton
									as={RouterLink}
									icon={<FiEdit3 />}
									label={'Edit profile'}
									to={'/profile/edit'}
									colorScheme='green'
									my={0}
								>
									Edit
								</TooltipIconButton>
							</ButtonGroup>
						</Box>
					</>
				) : (
					<Button
						as={RouterLink}
						leftIcon={<FiEdit3 />}
						to={'/profile/edit'}
						colorScheme='orange'
						my={2}
					>
						Create Your Profile
					</Button>
				)}
			</Stack>
		</Card>
	) : (
		<></>
	);
}
