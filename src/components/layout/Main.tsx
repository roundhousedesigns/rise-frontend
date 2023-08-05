import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import Dashboard from '../../routes/Dashboard';
import Login from '../../routes/Login';
import LostPassword from '../../routes/LostPassword';
import ResetPassword from '../../routes/ResetPassword';
import Register from '../../routes/Register';
import Profile from '../../routes/Profile';
import EditProfile from '../../routes/EditProfile';
import Results from '../../routes/Results';
import SavedProfiles from '../../routes/SavedProfiles';
import Settings from '../../routes/Settings';
import Help from '../../routes/Help';
import NotFound from '../../routes/NotFound';
import LoggedIn from '../LoggedIn';

export default function Main() {
	const LoggedInComponent = ({ component }: { component: JSX.Element }): JSX.Element => (
		<LoggedIn>{component}</LoggedIn>
	);

	return (
		<Box
			id='main'
			w='full'
			h='auto'
			py={2}
			background='none'
			justifyContent='center'
			alignItems='center'
			flex='1 1 auto'
		>
			<Container w='full' maxW='6xl' px={4} pb={4}>
				<Routes>
					<Route path='/' element={<LoggedInComponent component={<Dashboard />} />} />
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route path='/profile/:slug' element={<LoggedInComponent component={<Profile />} />} />
					<Route path='/profile/edit' element={<LoggedInComponent component={<EditProfile />} />} />
					<Route path='/results' element={<LoggedInComponent component={<Results />} />} />
					<Route path='/saved' element={<LoggedInComponent component={<SavedProfiles />} />} />
					<Route path='/settings' element={<LoggedInComponent component={<Settings />} />} />
					<Route path='/help' element={<LoggedInComponent component={<Help />} />} />

					{/* Pages with Google ReCaptcha */}
					<Route path='/login' element={<Login />} />
					<Route path='/lost-password' element={<LostPassword />} />
					<Route path='/register' element={<Register />} />

					{/* 404 */}
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Container>
		</Box>
	);
}
