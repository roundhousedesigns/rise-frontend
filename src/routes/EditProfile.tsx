import { Button, Spinner } from '@chakra-ui/react';
import Page from '../components/Page';
import EditProfileView from '../views/EditProfileView';
import ErrorAlert from '../components/common/ErrorAlert';
import { forwardRef, useRef } from 'react';

import { EditProfileContextProvider } from '../context/EditProfileContext';
import useUserProfile from '../hooks/queries/useUserProfile';
import useViewer from '../hooks/queries/useViewer';
import { FiArrowDown, FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const JumpToCreditsButton = forwardRef<HTMLButtonElement, {}>((props, ref) => {
	const handleClick = () => {
		const creditsElement = document.getElementById('credits');
		if (creditsElement) {
			creditsElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
		}
	};

	return (
		<Button
			onClick={handleClick}
			leftIcon={<FiArrowDown />}
			ref={ref}
			title='Scroll to Credits'
			textDecoration='none'
			colorScheme='blue'
		>
			Jump to Credits
		</Button>
	);
});

export default function EditProfile() {
	const { loggedInId: userId } = useViewer();
	const [profile, { loading, error }] = useUserProfile(Number(userId));
	const ref = useRef<HTMLButtonElement>(null);

	const navigate = useNavigate();

	const handleCancel = () => {
		navigate(-1);
	};

	const PageActions = () => (
		<>
			<JumpToCreditsButton ref={ref} />
			<Button onClick={handleCancel} leftIcon={<FiXCircle />} title='Cancel' colorScheme='orange'>
				Cancel
			</Button>
		</>
	);

	return (
		<Page title={'Update Profile'} actions={<PageActions />}>
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
