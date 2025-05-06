import { useEffect, useState, useMemo } from 'react';
import { MenuItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Candidate, ProfileNotification } from '@lib/classes';
import useCandidates from '@queries/useCandidates';

interface ProfileNotificationMenuItemProps {
	notification: ProfileNotification;
}

export default function ProfileNotificationMenuItem({
	notification,
}: ProfileNotificationMenuItemProps) {
	const { notificationType, value, title } = notification;
	const [userProfile, setUserProfile] = useState<Candidate | null>(null);

	// Parse profile ID from notification value if needed
	const profileId = useMemo(() => {
		if (notificationType === 'starred_profile_updated') {
			return parseInt(value);
		}
		return null;
	}, [notificationType, value]);

	const [candidates] = useCandidates(profileId ? [profileId] : []);

	// Update user profile when candidates are loaded
	useEffect(() => {
		if (candidates?.length) {
			setUserProfile(candidates[0]);
		}
	}, [candidates]);

	// Generate notification link based on type
	const link = useMemo(() => {
		switch (notificationType) {
			case 'starred_profile_updated':
				if (!userProfile) {
					return '#';
				}
				return `/profile/${userProfile.slug}`;

			case 'job_posted':
				return `/jobs/${value}`;

			default:
				return '#';
		}
	}, [notificationType, value, userProfile]);

	return (
		<MenuItem as={RouterLink} to={link}>
			{title}
		</MenuItem>
	);
}
