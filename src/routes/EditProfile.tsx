import { useContext } from 'react';
import { Spinner } from '@chakra-ui/react';
import Page from '../components/Page';
import EditProfileView from '../views/EditProfileView';
import ErrorAlert from '../components/common/ErrorAlert';

import { AuthContext } from '../context/AuthContext';
import { EditProfileContextProvider } from '../context/EditProfileContext';
import { useUserProfile } from '../hooks/queries/useUserProfile';

export default function EditProfile() {
	const {
		loggedInUser: { id: userId },
	} = useContext(AuthContext);

	const [profile, { loading, error }] = useUserProfile(userId);

	return (
		<Page title={'Update Profile'}>
			<EditProfileContextProvider initialState={profile}>
				{profile && !loading && !error ? (
					<EditProfileView profile={profile} profileLoading={loading} />
				) : loading ? (
					<Spinner />
				) : error ? (
					<ErrorAlert message={error.message} />
				) : (
					''
				)}
			</EditProfileContextProvider>
		</Page>
	);
}
