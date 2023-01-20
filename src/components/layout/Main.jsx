import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

import Dashboard from '@/routes/Dashboard';
import Search from '@/routes/Search';
import Profile from '@/routes/Profile';
import Settings from '@/routes/Settings';

export default function Main() {
	return (
		<Box
			id="main"
			w="full"
			h="auto"
			minH="2xl"
			background="none"
			align="center"
			justifyContent="center"
			alignItems="center"
			py={8}
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
