import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

import Dashboard from '../../routes/Dashboard';
import Login from '../../routes/Login';
import Results from '../../routes/Results';
import Profile from '../../routes/Profile';
import EditProfile from '../../routes/EditProfile';
import Settings from '../../routes/Settings';
import Account from '../../routes/Account';

export default function Main() {
	return (
		<Box
			id='main'
			w='full'
			h='auto'
			pt={5}
			pb={10}
			mb={10}
			background='none'
			justifyContent='center'
			alignItems='center'
			flex='1 1 auto'
		>
			<Container w='full' maxW='7xl' px={6}>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/login' element={<Login />} />
					<Route path='/results' element={<Results />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/profile/:userId' element={<Profile />} />
					<Route path='/profile/edit' element={<EditProfile />} />
					<Route path='/account' element={<Account />} />
					<Route path='/settings' element={<Settings />} />
				</Routes>
			</Container>
		</Box>
	);
}
