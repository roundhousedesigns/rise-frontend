import { forwardRef, useRef } from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { FiArrowDown } from 'react-icons/fi';
import { EditProfileContextProvider } from '@context/EditProfileContext';
import useViewer from '@hooks/queries/useViewer';
import useUserProfile from '@hooks/queries/useUserProfile';
import EditProfileView from '@views/EditProfileView';
import Page from '@components/Page';
import ErrorAlert from '@common/ErrorAlert';

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
	const { loggedInId, isOrg } = useViewer();
	const [profile, { loading, error }] = useUserProfile(loggedInId);
	const ref = useRef<HTMLButtonElement>(null);

	const PageActions = () => <JumpToCreditsButton ref={ref} />;

	return (
		<Page title={'Update Profile'} actions={!isOrg ? <PageActions /> : undefined}>
			<EditProfileContextProvider initialState={profile}>
				{profile && !loading && !error ? (
					<EditProfileView profile={profile} />
				) : loading ? (
					<Spinner alignSelf='center' />
				) : error ? (
					<ErrorAlert message={error.message} />
				) : (
					''
				)}
			</EditProfileContextProvider>
		</Page>
	);
}
