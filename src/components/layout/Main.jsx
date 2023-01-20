import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

import Dashboard from '@/routes/Dashboard';
import Search from '@/routes/Search';

export default function Main() {
	return (
		<Box
			id="main"
			w="full"
			minH="35vh"
			background="none"
			align="center"
			justifyContent="center"
			alignItems="center"
			p={8}
		>
			<Container w="full">
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</Container>
		</Box>
	);
}
