import { Button, Spinner } from '@chakra-ui/react';
import Page from '../components/Page';
import EditProfileView from '../views/EditProfileView';
import ErrorAlert from '../components/common/ErrorAlert';
import { forwardRef, useRef } from 'react';

import { EditProfileContextProvider } from '../context/EditProfileContext';
import useUserProfile from '../hooks/queries/useUserProfile';
import useViewer from '../hooks/queries/useViewer';

const JumpToCreditsButton = forwardRef<HTMLButtonElement, {}>((props, ref) => {
	const handleClick = () => {
		const creditsElement = document.getElementById('credits');
		if (creditsElement) {
			creditsElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
		}
	};

	return (
		<Button onClick={handleClick} ref={ref} title='Scroll to Credits' textDecoration='none'>
			Jump to Credits
		</Button>
	);
});

export default function EditProfile() {
	const { loggedInId: userId } = useViewer();
	const [profile, { loading, error }] = useUserProfile(Number(userId));
	const ref = useRef<HTMLButtonElement>(null);

	return (
		<Page title={'Update Profile'} actions={<JumpToCreditsButton ref={ref} />}>
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
