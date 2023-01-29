import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

import Dashboard from '../../routes/Dashboard';
import Search from '../../routes/Search';
import Profile from '../../routes/Profile';
import Settings from '../../routes/Settings';
import Account from '../../routes/Account';

export default function Main() {
	return (
		<Box
			id="main"
			w="full"
			h="auto"
			py={8}
			mb={10}
			background="none"
			justifyContent="center"
			alignItems="center"
		>
			<Container w="full" maxW="7xl">
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/search" element={<Search />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/account" element={<Account />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</Container>
		</Box>
	);
}
