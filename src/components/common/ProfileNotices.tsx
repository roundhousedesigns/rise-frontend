import useViewer from '@/hooks/queries/useViewer';
import { UserProfile } from '@/lib/classes';
import ProfileNotice from '@common/ProfileNotice';

interface Props {
	profile: UserProfile;
}

export default function ProfileNotices({ profile }: Props): JSX.Element {
	const { disableProfile, loggedInId } = useViewer();
	const { id, credits } = profile;

	const profileIsLoggedInUser = loggedInId === id;

	return profileIsLoggedInUser ? (
		disableProfile ? (
			<ProfileNotice code='profile_disabled' status='warning' />
		) : credits.length < 1 ? (
			<ProfileNotice code='no_credits' status='warning' />
		) : (
			<></>
		)
	) : (
		<></>
	);
}
