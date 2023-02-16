import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ErrorAlert from '../components/common/ErrorAlert';

import { AuthContext } from '../context/AuthContext';
import { useUserProfile } from '../hooks/queries/useUserProfile';

import { CreditParams } from '../lib/types';
import { Credit, UserProfile } from '../lib/classes';

export default function Profile() {
	const {
		loggedInUser: { id: loggedInId },
	} = useContext(AuthContext);
	const params = useParams();

	// If no user ID is in the route, use the logged in user's ID.
	const userId = params.userId ? parseInt(params.userId) : loggedInId;
	const { data, loading, error } = useUserProfile(userId);

	const preparedCredits = data?.credits.nodes.map((credit: CreditParams) => new Credit(credit));

	const profile = data ? new UserProfile(data.user, preparedCredits) : null;

	return (
		<Page title={params.userId ? '' : 'My Profile'}>
			{profile && !loading && !error ? (
				<ProfileView profile={profile} loading={loading} editable={loggedInId === userId} />
			) : loading ? (
				<>Loading...</>
			) : error ? (
				<ErrorAlert message={error.message} />
			) : (
				''
			)}
		</Page>
	);
}
