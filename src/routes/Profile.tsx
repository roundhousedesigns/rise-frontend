import { ButtonGroup } from '@chakra-ui/react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { FiEdit3 } from 'react-icons/fi';
import useViewer from '../hooks/queries/useViewer';
import useUserId from '../hooks/queries/useUserId';
import useUserProfile from '../hooks/queries/useUserProfile';
import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ResponsiveButton from '../components/common/inputs/ResponsiveButton';
import ProfileDisabledNotice from '../components/common/ProfileDisabledNotice';

export default function Profile(): JSX.Element {
	const { loggedInId, loggedInSlug, disableProfile } = useViewer();
	const params = useParams();

	const slug = params.slug ? params.slug : '';
	const [userId] = useUserId(slug);
	const profileIsLoggedInUser = loggedInSlug === slug;
	const profileId = profileIsLoggedInUser ? loggedInId : userId;

	const [profile, { loading }] = useUserProfile(profileId ? profileId : loggedInId);

	const PageActions = () => (
		<ButtonGroup size='md' alignItems='center'>
			{profileIsLoggedInUser && (
				<ResponsiveButton
					label='Edit profile'
					icon={<FiEdit3 />}
					as={RouterLink}
					to='/profile/edit'
					colorScheme='green'
				>
					Edit
				</ResponsiveButton>
			)}
		</ButtonGroup>
	);

	return (
		<Page
			title={profileIsLoggedInUser ? 'My Profile' : ''}
			actions={<PageActions />}
			loading={loading}
			pb={8}
		>
			{profile && !disableProfile ? (
				<ProfileView profile={profile} allowBookmark={loggedInId !== profileId} />
			) : profile && disableProfile ? (
				<ProfileDisabledNotice />
			) : (
				false
			)}
		</Page>
	);
}
