import { Link, useParams } from 'react-router-dom';
import { Flex, IconButton, Spinner, useMediaQuery } from '@chakra-ui/react';
import { FiEdit3, FiShare } from 'react-icons/fi';

import useViewer from '../hooks/queries/useViewer';
import useUserId from '../hooks/queries/useUserId';
import useUserProfile from '../hooks/queries/useUserProfile';

import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ErrorAlert from '../components/common/ErrorAlert';
import { getProfileURL } from '../lib/utils';

export default function Profile(): JSX.Element {
	const { loggedInId, loggedInSlug } = useViewer();
	const params = useParams();
	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

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
		<Flex flexWrap='wrap' gap={2} alignItems='center'>
			{profileIsLoggedInUser && (
				<IconButton
					as={Link}
					to='/profile/edit'
					aria-label='Edit profile'
					icon={<FiEdit3 />}
					colorScheme='green'
					size={{ base: 'md', md: 'xl' }}
				/>
			)}

			<IconButton
				onClick={handleShareClick}
				colorScheme='blue'
				aria-label='Share profile'
				icon={<FiShare />}
				size={{ base: 'md', md: 'xl' }}
			/>
		</Flex>
	);

	return (
		<Page title={profileIsLoggedInUser ? 'My Profile' : ''} actions={<PageActions />}>
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
