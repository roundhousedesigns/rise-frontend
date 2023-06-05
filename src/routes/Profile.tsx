import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from '@chakra-ui/react';

import useViewer from '../hooks/queries/useViewer';
import useUserId from '../hooks/queries/useUserId';
import { useUserProfile } from '../hooks/queries/useUserProfile';

import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ErrorAlert from '../components/common/ErrorAlert';
import { FiEdit3, FiShare } from 'react-icons/fi';
import { getProfileURL } from '../lib/utils';

export default function Profile(): JSX.Element {
	const { loggedInId, loggedInSlug } = useViewer();
	const params = useParams();

	const slug = params.slug ? params.slug : '';

	const [userId] = useUserId(slug);

	const profileIsLoggedInUser = loggedInSlug === slug;

	// If no slug is in the route, use the logged in user's ID.
	const [profile, { loading, error }] = useUserProfile(userId ? userId : loggedInId);

	const handleShareClick = () => {
		if (navigator.share) {
			navigator
				.share({
					title: 'Share this profile',
					text: 'Check out this profile on the RISE Theatre Directory.',
					url: getProfileURL(slug),
				})
				.then(() => {
					console.info('sucess');
				})
				.catch((error) => {
					console.error('Error sharing', error);
				});
		} else {
			console.log('Web Share API not supported on this browser.');
		}
	};

	const PageActions = () => (
		<>
			{profileIsLoggedInUser ? (
				<Button as={Link} to='/profile/edit' leftIcon={<FiEdit3 />} colorScheme='green'>
					Edit
				</Button>
			) : (
				false
			)}
			<Button onClick={handleShareClick} colorScheme='blue' leftIcon={<FiShare />}>
				Share
			</Button>
		</>
	);

	return (
		<Page
			title={profileIsLoggedInUser ? 'My Profile' : ''}
			actions={profileIsLoggedInUser ? <PageActions /> : null}
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
