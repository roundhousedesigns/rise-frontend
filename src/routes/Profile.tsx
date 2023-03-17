import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from '@chakra-ui/react';
import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ErrorAlert from '../components/common/ErrorAlert';

import { useUserProfile } from '../hooks/queries/useUserProfile';

import { isEqualNumberlike, maybeParseInt } from '../lib/utils';

export default function Profile(): JSX.Element {
	const storedLoggedInId = sessionStorage.getItem('loggedInId');
	const loggedInId = storedLoggedInId ? Number(storedLoggedInId) : null;
	const params = useParams();

	// If no user ID is in the route, use the logged in user's ID.
	const userId = params.userId ? maybeParseInt(params.userId) : loggedInId;
	const profileIsLoggedInUser =
		userId && loggedInId ? isEqualNumberlike(userId, loggedInId) : false;

	const [profile, { loading, error }] = useUserProfile(userId ? userId : 0);

	const EditButton = () => (
		<Button as={Link} to='/profile/edit'>
			Edit Profile
		</Button>
	);

	return (
		<Page
			title={profileIsLoggedInUser ? 'My Profile' : ''}
			actions={profileIsLoggedInUser ? <EditButton /> : null}
		>
			{profile && !loading && !error ? (
				<ProfileView profile={profile} loading={loading} />
			) : loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : (
				'No user.'
			)}
		</Page>
	);
}
