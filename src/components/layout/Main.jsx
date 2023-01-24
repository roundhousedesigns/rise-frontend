import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

import Dashboard from '@/views/Dashboard';
import Search from '@/views/Search';
import Profile from '@/views/Profile';
import Settings from '@/views/Settings';

export default function Main() {
	return (
		<Box
			id="main"
			w="full"
			h="auto"
			background="none"
			align="center"
			justifyContent="center"
			alignItems="center"
			py={8}
			mb={10}
		>
			<Container w="full" maxW="8xl">
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/search" element={<Search />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</Container>
		</Box>
	);
}
