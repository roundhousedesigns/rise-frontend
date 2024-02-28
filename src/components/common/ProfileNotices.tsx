import useViewer from '@/hooks/queries/useViewer';
import { Box } from '@chakra-ui/react';
import { UserProfile } from '@/lib/classes';
import ProfileNotice from '@common/ProfileNotice';

interface Props {
	profile: UserProfile;
	[prop: string]: any;
}

export default function ProfileNotices({ profile, ...props }: Props): JSX.Element {
	const { disableProfile, loggedInId } = useViewer();
	const { id, credits } = profile;

	const profileIsLoggedInUser = loggedInId === id;

	return (
		<Box {...props}>
			{profileIsLoggedInUser ? (
				disableProfile ? (
					<ProfileNotice code='profile_disabled' status='warning' />
				) : credits.length < 1 ? (
					<ProfileNotice code='no_credits' status='warning' />
				) : (
					<></>
				)
			) : (
				<></>
			)}
		</Box>
	);
}
