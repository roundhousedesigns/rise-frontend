import { Navigate, useRoutes } from 'react-router-dom';
import { Box, Text, chakra } from '@chakra-ui/react';
import Dashboard from '@routes/Dashboard';
import Login from '@routes/Login';
import LostPassword from '@routes/LostPassword';
import ResetPassword from '@routes/ResetPassword';
import Register from '@routes/Register';
import Profile from '@routes/Profile';
import EditProfile from '@routes/EditProfile';
import Results from '@routes/Results';
import StarredProfiles from '@routes/StarredProfiles';
import Settings from '@routes/Settings';
import NotFound from '@routes/NotFound';
import SavedSearches from '@routes/SavedSearches';
import JobPosts from '@routes/JobPosts';
import JobPost from '@routes/JobPost';
import ManageJobPosts from '@routes/ManageJobPosts';
import EditJobPost from '@routes/EditJobPost';
import ProfileNotices from '@common/ProfileNotices';
import LoggedIn from '@components/LoggedIn';
import DevMode from '@dev/DevMode';

import pkgJSON from '@@/package.json';
const __APP_VERSION__ = `v${pkgJSON.version}`;

export default function Main() {
	const routes = useRoutes([
		{
			path: '/',
			element: (
				<LoggedIn>
					<Dashboard />
				</LoggedIn>
			),
		},
		{
			path: '/reset-password',
			element: <ResetPassword />,
		},
		{
			path: '/profile/:slug',
			element: (
				<LoggedIn>
					<Profile />
				</LoggedIn>
			),
		},
		{
			path: '/profile/edit',
			element: (
				<LoggedIn>
					<EditProfile />
				</LoggedIn>
			),
		},
		{
			path: '/results',
			element: (
				<LoggedIn>
					<Results />
				</LoggedIn>
			),
		},
		{
			path: '/starred',
			element: (
				<LoggedIn>
					<StarredProfiles />
				</LoggedIn>
			),
		},
		{
			path: '/stars',
			element: <Navigate to={'/starred'} replace />,
		},
		{
			path: '/searches',
			element: (
				<LoggedIn>
					<SavedSearches />
				</LoggedIn>
			),
		},
		{
			path: '/settings',
			element: (
				<LoggedIn>
					<Settings />
				</LoggedIn>
			),
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/lost-password',
			element: <LostPassword />,
		},
		{
			path: '/register',
			element: <Register />,
		},
		{
			path: '/jobs',
			element: (
				<LoggedIn>
					<JobPosts />
				</LoggedIn>
			),
		},
		{
			path: '/job/:id',
			element: (
				<LoggedIn>
					<JobPost />
				</LoggedIn>
			),
		},
		{
			path: '/jobs/manage',
			element: (
				<LoggedIn>
					<ManageJobPosts />
				</LoggedIn>
			),
		},
		{
			path: '/jobs/new',
			element: <EditJobPost />,
		},
		{
			path: '/jobs/edit/:id',
			element: (
				<LoggedIn>
					<EditJobPost />
				</LoggedIn>
			),
		},
		{
			path: '*',
			element: <NotFound />,
		},
	]);

	return (
		<Box w='full' h='auto' minH='100%' background='none' flex={'1 1 auto'}>
			<ProfileNotices />

			<Box px={2}>{routes}</Box>

			<DevMode>
				<Box
					w='100%'
					textAlign='center'
					m={0}
					px={0}
					bgColor='brand.blue'
					lineHeight='shorter'
					fontSize='2xs'
					position='fixed'
					bottom={0}
					left={0}
					right={0}
					borderTop='1px solid var(--chakra-colors-bg-dark)'
					zIndex={1000}
				>
					<Text my={0.5}>
						{`Development Branch: `}
						<chakra.span as={chakra.code} pl={1}>
							{__APP_VERSION__}
						</chakra.span>
					</Text>
				</Box>
			</DevMode>
		</Box>
	);
}
