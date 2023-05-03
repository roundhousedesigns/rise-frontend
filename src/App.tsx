import { Stack, Image, IconButton, useColorMode } from '@chakra-ui/react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import logo from './assets/images/gtw-logo-horizontal.svg';
import { FiMoon, FiSun } from 'react-icons/fi';

import { SearchContextProvider } from './context/SearchContext';

import { useViewer } from './hooks/queries/useViewer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function App() {
	const { loggedInId } = useViewer();
	const { colorMode, toggleColorMode } = useColorMode();

	const navigate = useNavigate();

	// get the current route
	const { pathname } = useLocation();

	const publicEndpoints = ['/register', '/login', '/lost-password', '/reset-password'];

	// if the user is not logged in, redirect to the login page
	useEffect(() => {
		if (!loggedInId && !publicEndpoints.includes(pathname)) {
			navigate('/login');
		}
	}, [loggedInId, pathname]);

	return (
		<SearchContextProvider>
			<Stack direction='column' alignItems='center' minH='100vh'>
				{loggedInId ? (
					<Header />
				) : (
					<Image src={logo} alt='Get To Work logo' loading='eager' w='3xl' h='auto' mt={4} />
				)}
				<Main />
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
