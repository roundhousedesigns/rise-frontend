import { useContext } from 'react';
import Page from '../components/common/Page';
import ProfileView from '../views/ProfileView';

import { AuthContext } from '../context/AuthContext';
import { useUserProfile } from '../hooks/queries/useUserProfile';

import { _devProfileData, _devCreditsData } from '../lib/_devData';
import { UserProfile } from '../lib/classes';

export default function Profile() {
	const { loggedInUser } = useContext(AuthContext);
	const { data, loading, error } = useUserProfile(loggedInUser);

	const profile = data?.user ? new UserProfile(data.user) : null;

	return profile ? (
		<Page title='My Profile'>
			<ProfileView profile={profile} credits={_devCreditsData} />
		</Page>
	) : (
		<>Nada</>
	);
}
