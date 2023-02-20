import { useContext } from 'react';
import { Button } from '@chakra-ui/react';
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

	const { data, loading, error } = useUserProfile(userId);

	const preparedCredits = data?.credits.nodes.map((credit: CreditParams) => new Credit(credit));

	const profile = data ? new UserProfile(data.user, preparedCredits) : null;

	// TODO Implement Profile save
	const SaveButton = () => <Button onClick={() => alert('save')}>Save</Button>;

	return (
		<Page title={'Update Profile'} actions={<SaveButton />}>
			{profile && !loading && !error ? (
				<EditProfileView profile={profile} loading={loading} />
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
