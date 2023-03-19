import { Spinner } from '@chakra-ui/react';
import Page from '../components/Page';
import EditProfileView from '../views/EditProfileView';
import ErrorAlert from '../components/common/ErrorAlert';

import { EditProfileContextProvider } from '../context/EditProfileContext';
import { useUserProfile } from '../hooks/queries/useUserProfile';
import { useViewer } from '../hooks/queries/useViewer';

export default function EditProfile() {
	const { loggedInId: userId } = useViewer();

	const [profile, { loading, error }] = useUserProfile(Number(userId));

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
