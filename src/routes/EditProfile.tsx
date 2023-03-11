import { useContext } from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import Page from '../components/Page';
import EditProfileView from '../views/EditProfileView';
import ErrorAlert from '../components/common/ErrorAlert';

import { AuthContext } from '../context/AuthContext';
import { useUserProfile } from '../hooks/queries/useUserProfile';

import { CreditParams } from '../lib/types';
import { Credit, UserProfile } from '../lib/classes';

export default function EditProfile() {
	const {
		loggedInUser: { id: userId },
	} = useContext(AuthContext);

	// TODO probably move this to the view

	const { data, loading, error } = useUserProfile(userId);

	const preparedCredits = data?.credits.nodes.map((credit: CreditParams) => new Credit(credit));

	const profile = data ? new UserProfile(data.user, preparedCredits) : null;

	return (
		<Page title={'Update Profile'}>
			{profile && !loading && !error ? (
				<EditProfileView profile={profile} profileLoading={loading} />
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
