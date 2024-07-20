import useUserProfile from '@queries/useUserProfile';
import useViewer from '@queries/useViewer';
import ProfileNotice from '@common/ProfileNotice';

interface Props {
	userId: number;
}

export default function ProfileNotices(): JSX.Element {
	const [{ disableProfile, loggedInId }] = useViewer();
	const [profile] = useUserProfile(loggedInId);

	if (!profile) {
		return <></>;
	}

	const { credits } = profile;

	return disableProfile ? (
		<ProfileNotice code='profile_disabled' status='warning' />
	) : credits && credits.length < 1 ? (
		<ProfileNotice code='no_credits' status='warning' />
	) : (
		<></>
	);
}
