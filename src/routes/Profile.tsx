import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from '@chakra-ui/react';
import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ErrorAlert from '../components/common/ErrorAlert';

import { useUserProfile } from '../hooks/queries/useUserProfile';

import { isEqualNumberlike, maybeParseInt } from '../lib/utils';

export default function Profile() {
	const {
		user: { id: loggedInId },
	} = sessionStorage.get('loggedInUser');
	const params = useParams();

	// TODO refetch profile when user edits it

	// If no user ID is in the route, use the logged in user's ID.
	const userId = params.userId ? maybeParseInt(params.userId) : loggedInId;
	const isLoggedInUser = isEqualNumberlike(userId, loggedInId);

	const [profile, { loading, error }] = useUserProfile(userId);

	const EditButton = () => (
		<Button as={Link} to='/profile/edit'>
			Edit Profile
		</Button>
	);

	return (
		<Page
			title={isLoggedInUser ? 'My Profile' : ''}
			actions={isLoggedInUser ? <EditButton /> : null}
		>
			{profile && !loading && !error ? (
				<ProfileView profile={profile} loading={loading} />
			) : loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : (
				''
			)}
		</Page>
	);
}
