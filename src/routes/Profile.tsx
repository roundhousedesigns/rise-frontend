import { Link, useParams } from 'react-router-dom';
import { ButtonGroup, Spinner } from '@chakra-ui/react';
import { FiEdit3, FiShare } from 'react-icons/fi';

import useViewer from '../hooks/queries/useViewer';
import useUserId from '../hooks/queries/useUserId';
import useUserProfile from '../hooks/queries/useUserProfile';

import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ErrorAlert from '../components/common/ErrorAlert';
import { getProfileURL } from '../lib/utils';
import ResponsiveButton from '../components/common/inputs/ResponsiveButton';

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
		<ButtonGroup size='md' alignItems='center'>
			{profileIsLoggedInUser && (
				<ResponsiveButton
					label='Edit profile'
					icon={<FiEdit3 />}
					as={Link}
					to='/profile/edit'
					colorScheme='green'
				>
					Edit
				</ResponsiveButton>
			)}

			<ResponsiveButton
				label='Share profile'
				icon={<FiShare />}
				colorScheme='blue'
				onClick={handleShareClick}
			>
				Share
			</ResponsiveButton>
		</ButtonGroup>
	);

	return (
		<Page title={profileIsLoggedInUser ? 'My Profile' : ''} actions={<PageActions />} pb={8}>
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
