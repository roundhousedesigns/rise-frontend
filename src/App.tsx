import { Stack, IconButton, useColorMode } from '@chakra-ui/react';

import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import { FiMoon, FiSun } from 'react-icons/fi';

import { SearchContextProvider } from './context/SearchContext';

import { useViewer } from './hooks/queries/useViewer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginView from './views/LoginView';

export default function App() {
	const {
		loggedInId,
		result: { loading },
	} = useViewer();
	const { colorMode, toggleColorMode } = useColorMode();

	const navigate = useNavigate();

	// get the current route
	const { pathname } = useLocation();

	// URL endpoints to be allowed when logged out
	const publicEndpoints = ['/register', '/login', '/lost-password', '/reset-password'];

	// if the user is not logged in, redirect to the login page
	useEffect(() => {
		if (loading) return;

		if (!loggedInId && !publicEndpoints.includes(pathname)) {
			navigate('/login');
		}
	}, [loggedInId, pathname]);

	return (
		<SearchContextProvider>
			<Stack
				direction='column'
				alignItems='center'
				minH='100vh'
				_dark={{
					bg: 'text.dark',
					color: 'white',
				}}
				_light={{
					bg: 'white',
					color: 'text.dark',
				}}
			>
				<Header />
				{!loggedInId && !publicEndpoints.includes(pathname) && !loading ? <LoginView /> : <Main />}
				<Footer />
			</Stack>
			<IconButton
				aria-label='Toggle dark mode'
				variant='ghost'
				icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
				size='md'
				pos='absolute'
				colorScheme='gray'
				right={0}
				bottom={0}
				m={2}
				onClick={toggleColorMode}
			/>
		</SearchContextProvider>
	);
}
