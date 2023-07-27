import { Link, useParams } from 'react-router-dom';
import { ButtonGroup } from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import useViewer from '../hooks/queries/useViewer';
import useUserId from '../hooks/queries/useUserId';
import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ResponsiveButton from '../components/common/inputs/ResponsiveButton';

export default function Profile(): JSX.Element {
	const { loggedInId, loggedInSlug } = useViewer();
	const params = useParams();

	const slug = params.slug ? params.slug : '';
	const [userId] = useUserId(slug);
	const profileIsLoggedInUser = loggedInSlug === slug;
	const profileId = profileIsLoggedInUser ? loggedInId : userId;

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
		</ButtonGroup>
	);

	return (
		<Page title={profileIsLoggedInUser ? 'My Profile' : ''} actions={<PageActions />} pb={8}>
			{profileId ? <ProfileView profileId={profileId} /> : false}
		</Page>
	);
}
