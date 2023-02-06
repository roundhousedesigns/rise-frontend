import { useContext } from 'react';
import Page from '../components/common/Page';
import ProfileView from '../views/ProfileView';

import { AuthContext } from '../context/AuthContext';
import { useUserProfile } from '../hooks/queries/useUserProfile';

import { UserProfile } from '../lib/classes';

export default function Profile() {
	const { loggedInUser } = useContext(AuthContext);
	const { data, loading, error } = useUserProfile(loggedInUser);

	const profile = data?.user ? new UserProfile(data.user, data.credits.nodes) : null;

	return (
		<Page title='My Profile'>
			{profile && !loading && !error ? (
				<ProfileView profile={profile} loading={loading} />
			) : loading ? (
				<>Loading...</>
			) : error ? (
				<>{error}</>
			) : (
				''
			)}
		</Page>
	);
}
