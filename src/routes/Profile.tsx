import { ButtonGroup } from '@chakra-ui/react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { FiEdit3 } from 'react-icons/fi';
import useViewer from '@hooks/queries/useViewer';
import useUserId from '@hooks/queries/useUserId';
import useUserProfile from '@hooks/queries/useUserProfile';
import TooltipIconButton from '@common/inputs/TooltipIconButton';
import Page from '@components/Page';
import ProfileView from '@views/ProfileView';

export default function Profile(): JSX.Element {
	const { loggedInId, loggedInSlug } = useViewer();
	const params = useParams();

	const slug = params.slug ? params.slug : '';
	const [userId] = useUserId(slug);
	const profileIsLoggedInUser = loggedInSlug === slug;
	const profileId = profileIsLoggedInUser ? loggedInId : userId;

	const [profile, { loading }] = useUserProfile(profileId ? profileId : loggedInId);

	const PageActions = () => (
		<ButtonGroup size='md' alignItems='center'>
			{profileIsLoggedInUser && (
				<TooltipIconButton
					label='Edit profile'
					icon={<FiEdit3 />}
					as={RouterLink}
					to='/profile/edit'
					colorScheme='green'
				/>
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
			{profile ? <ProfileView profile={profile} allowBookmark={loggedInId !== profileId} /> : false}
		</Page>
	);
}
