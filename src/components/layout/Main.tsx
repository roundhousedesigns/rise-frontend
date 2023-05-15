import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

import Dashboard from '../../routes/Dashboard';

import Login from '../../routes/Login';
import LostPassword from '../../routes/LostPassword';
import ResetPassword from '../../routes/ResetPassword';
import Register from '../../routes/Register';
import Results from '../../routes/Results';
import Profile from '../../routes/Profile';
import EditProfile from '../../routes/EditProfile';
import Settings from '../../routes/Settings';
import Help from '../../routes/Help';

export default function Main() {
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
			<Container w='full' maxW='6xl' px='40px' pb={4}>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route path='/results' element={<Results />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/profile/:userId' element={<Profile />} />
					<Route path='/profile/edit' element={<EditProfile />} />
					{/* <Route path='/account' element={<Account />} /> */}
					<Route path='/settings' element={<Settings />} />
					<Route path='/help' element={<Help />} />

					{/* Pages with Google ReCaptcha */}
					<Route path='/login' element={<Login />} />
					<Route path='/lost-password' element={<LostPassword />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Container>
		</Box>
	);
}
