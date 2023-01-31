import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';

import Dashboard from '../../routes/Dashboard';
import Login from '../../routes/Login';
import Search from '../../routes/Search';
import Profile from '../../routes/Profile';
import Settings from '../../routes/Settings';
import Account from '../../routes/Account';

import { AuthContext } from '../../context/AuthContext';

export default function Main() {
	const { userIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();

	/**
	 * Check for changes in login status and redirect to login page if user is not logged in.
	 */
	useEffect(() => {
		if (userIsLoggedIn !== true) {
			navigate('/login');
		}
	}, [userIsLoggedIn]);

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
			flex="1 1 auto"
		>
			<Container w="full" maxW="7xl" px={6}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="/search" element={<Search />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/account" element={<Account />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</Container>
		</Box>
	);
}
