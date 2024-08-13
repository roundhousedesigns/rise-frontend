import { Navigate, useRoutes } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import LoggedIn from '@components/LoggedIn';
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
import Help from '@routes/Help';
import NotFound from '@routes/NotFound';
import SavedSearches from '@routes/SavedSearches';

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
			path: '/help',
			element: (
				<LoggedIn>
					<Help />
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
			path: '*',
			element: <NotFound />,
		},
	]);

	return (
		<Box
			id={'main'}
			w={'full'}
			h={'auto'}
			py={2}
			background={'none'}
			justifyContent={'center'}
			alignItems={'center'}
			flex={'1 1 auto'}
		>
			<Container w={'full'} maxW={'6xl'} px={{ base: 4, md: 8 }} pb={4}>
				{routes}
			</Container>
		</Box>
	);
}
