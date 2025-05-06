import { useState } from 'react';
import {
	Heading,
	Flex,
	Stack,
	Card,
	ButtonGroup,
	Button,
	Avatar,
	Box,
	CardProps,
	Spacer,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Icon,
	Badge,
	Circle,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiUser, FiEdit3, FiBell } from 'react-icons/fi';
import { UserProfile } from '@lib/classes';
import useViewer from '@queries/useViewer';
import useUnreadProfileNotifications from '@queries/useProfileNotifications';
import { useProfileCompletion, useProfileUrl } from '@hooks/hooks';
import TooltipIconButton from '@common/inputs/TooltipIconButton';
import ProfilePercentComplete from '@components/ProfilePercentComplete';
import ProfileNotificationMenuItem from '@components/ProfileNotificationMenuItem';

interface Props {
	profile: UserProfile;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function MiniProfileView({ profile, ...props }: Props & CardProps): JSX.Element {
	const [{ loggedInSlug, loggedInId, disableProfile }] = useViewer();

	const [unreadProfileNotifications] = useUnreadProfileNotifications(loggedInId);

	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const { image } = profile || {};

	const percentComplete = useProfileCompletion(loggedInId);

	const profileUrl = useProfileUrl(loggedInSlug);

	return profile ? (
		<Card
			px={4}
			m={0}
			align='center'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<Flex
				as={Flex}
				mt={2}
				gap={2}
				justifyContent='space-between'
				position='absolute'
				flexWrap='nowrap'
				top={0}
				right={0}
				px={2}
				zIndex={1000}
				width='full'
			>
				<ButtonGroup
					size='xs'
					spacing={1}
					opacity={isHovered ? 1 : 0}
					transition='opacity 200ms ease'
				>
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

				{unreadProfileNotifications.length > 0 && (
					<Menu>
						<MenuButton
							as={IconButton}
							icon={<ProfileNotificationsIcon number={unreadProfileNotifications.length} />}
							size='sm'
							colorScheme='orange'
							borderRadius='full'
							pos='relative'
						/>
						<MenuList>
							{unreadProfileNotifications.map((notification) => (
								<ProfileNotificationMenuItem key={notification.id} notification={notification} />
							))}
						</MenuList>
					</Menu>
				)}
			</Flex>
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
						<Heading size='md' m={0} fontWeight='bold' lineHeight='none'>
							{profile.fullName()}
						</Heading>
					</Flex>
				</Box>

				{percentComplete > 30 || disableProfile ? (
					<Box>{percentComplete < 100 ? <ProfilePercentComplete colorScheme='blue' /> : null}</Box>
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

const ProfileNotificationsIcon = ({ number }: { number: number }) => {
	return (
		<Circle position='relative'>
			<Icon as={FiBell} color='text.dark' />
			<Flex
				borderRadius='full'
				position='absolute'
				bottom={-5}
				right={-3}
				bg='gray.700'
				justifyContent='center'
				alignItems='center'
				textAlign='center'
			>
				<Circle
					color='text.dark'
					bg='brand.yellow'
					m={0.5}
					py={0.5}
					px={1}
					minW='1.5em'
					fontSize='2xs'
					textAlign='center'
				>
					{number}
				</Circle>
			</Flex>
		</Circle>
	);
};
