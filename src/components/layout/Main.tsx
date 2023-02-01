import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

import Dashboard from '../../routes/Dashboard';
import Login from '../../routes/Login';
import Search from '../../routes/Search';
import Profile from '../../routes/Profile';
import Settings from '../../routes/Settings';
import Account from '../../routes/Account';

// DEV
import _devScratch from '../../routes/_devScratch';

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
					<Route path='/search' element={<Search />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/account' element={<Account />} />
					<Route path='/settings' element={<Settings />} />

					{/* SCRATCHPAD */}
					<Route path='/_scratch' element={<_devScratch />} />
				</Routes>
			</Container>
		</Box>
	);
}
