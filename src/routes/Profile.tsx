import { useContext } from 'react';
import Page from '../components/Page';
import ProfileView from '../views/ProfileView';

import { AuthContext } from '../context/AuthContext';
import { useUserProfile } from '../hooks/queries/useUserProfile';

import { UserProfile } from '../lib/classes';
import { useParams } from 'react-router-dom';

export default function Profile() {
	const {
		loggedInUser: { id: loggedInId },
	} = useContext(AuthContext);
	const params = useParams();

	// If no user ID is in the route, use the logged in user's ID.
	const userId = params.userId ? parseInt(params.userId) : loggedInId;
	const { data, loading, error } = useUserProfile(userId);

	const profile = data?.user ? new UserProfile(data.user, data.credits.nodes) : null;

	return (
		<Page title={params.userId ? '' : 'My Profile'}>
			{profile && !loading && !error ? (
				<ProfileView profile={profile} loading={loading} />
			) : loading ? (
				<>Loading...</>
			) : error ? (
				<>{error.message}</>
			) : (
				''
			)}
		</Page>
	);
}
