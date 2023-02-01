import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';

import { AuthContext } from './context/AuthContext';

export default function App() {
	const { loggedInUser } = useContext(AuthContext);
	const navigate = useNavigate();
	/**
	 * Check for changes in login status and redirect to login page if user is not logged in.
	 */
	useEffect(() => {
		// TODO fix this so it doesn't flash the logged-in content before redirecting.
		if (!loggedInUser) {
			navigate('/login');
		}
	}, [loggedInUser]);

	return (
		<Stack direction='column' alignItems='center' minH='100vh'>
			<Header />
			<Main />
			<Footer />
		</Stack>
	);
}
