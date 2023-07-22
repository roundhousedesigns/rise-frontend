import { Link, useParams } from 'react-router-dom';
import { ButtonGroup } from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';

import { useProfileUrl } from '../hooks/hooks';
import useViewer from '../hooks/queries/useViewer';
import useUserId from '../hooks/queries/useUserId';

import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ResponsiveButton from '../components/common/inputs/ResponsiveButton';
import ShareButton from '../components/common/ShareButton';

export default function Profile(): JSX.Element {
	const { loggedInId, loggedInSlug } = useViewer();
	const params = useParams();

	const slug = params.slug ? params.slug : '';
	const profileUrl = useProfileUrl(slug);

	const [userId] = useUserId(slug);

	const profileIsLoggedInUser = loggedInSlug === slug;

	// If no slug is in the route, use the logged in user's ID.
	const profileId = userId ? userId : loggedInId;

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

			<ShareButton url={profileUrl} />
		</ButtonGroup>
	);

	return (
		<Page title={profileIsLoggedInUser ? 'My Profile' : ''} actions={<PageActions />} pb={8}>
			{profileId ? <ProfileView profileId={profileId} /> : false}
		</Page>
	);
}
