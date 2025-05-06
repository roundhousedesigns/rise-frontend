import { useEffect, useState, useMemo } from 'react';
import { MenuItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Candidate, ProfileNotification } from '@lib/classes';
import useCandidates from '@queries/useCandidates';

interface ProfileNotificationMenuItemProps {
	notification: ProfileNotification;
}

interface NotificationContent {
	message: string;
	link: string;
}

export default function ProfileNotificationMenuItem({
	notification,
}: ProfileNotificationMenuItemProps) {
	const { notificationType, value: notificationValue } = notification;
	const [userProfile, setUserProfile] = useState<Candidate | null>(null);

	// Parse profile ID from notification value if needed
	const profileId = useMemo(() => {
		if (notificationType === 'starred_profile_updated') {
			return parseInt(notificationValue);
		}
		return null;
	}, [notificationType, notificationValue]);

	const [candidates] = useCandidates(profileId ? [profileId] : []);

	// Update user profile when candidates are loaded
	useEffect(() => {
		if (candidates?.length) {
			setUserProfile(candidates[0]);
		}
	}, [candidates]);

	// Generate notification content based on type
	const notificationContent = useMemo<NotificationContent>(() => {
		switch (notificationType) {
			case 'starred_profile_updated':
				if (!userProfile) {
					return { message: '', link: '#' };
				}
				return {
					message: `${userProfile.fullName()} updated their profile.`,
					link: `/profile/${userProfile.slug}`,
				};

			case 'job_posted':
				// Example of a job notification that doesn't need userProfile
				return {
					message: 'A new job matching your criteria has been posted.',
					link: `/jobs/${notificationValue}`,
				};

			default:
				return { message: '', link: '#' };
		}
	}, [notificationType, notificationValue, userProfile]);

	return (
		<MenuItem as={RouterLink} to={notificationContent.link}>
			{notificationContent.message}
		</MenuItem>
	);
}
