import { forwardRef, useRef } from 'react';
import { Button, Spinner } from '@chakra-ui/react';
import { FiArrowDown } from 'react-icons/fi';
import { EditProfileContextProvider } from '@context/EditProfileContext';
import useViewer from '@queries/useViewer';
import useUserProfile from '@queries/useUserProfile';
import EditProfileView from '@views/EditProfileView';
import Shell from '@layout/Shell';
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
			title={'Scroll to Credits'}
			textDecoration='none'
			colorScheme='blue'
		>
			Jump to Credits
		</Button>
	);
});

export default function EditProfile() {
	const [{ loggedInId }] = useViewer();
	const [profile, { loading, error }] = useUserProfile(loggedInId);
	const ref = useRef<HTMLButtonElement>(null);

	const PageActions = () => <JumpToCreditsButton ref={ref} />;

	return (
		<Shell title={'Update Profile'} actions={<PageActions />}>
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
		</Shell>
	);
}
