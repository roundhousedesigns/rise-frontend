import { useEffect } from 'react';
import { Box, Stack, Image, Center, IconButton, useColorMode } from '@chakra-ui/react';
import { useRefreshToken } from './hooks/mutations/useRefreshToken';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import logo from './assets/images/gtw-logo-horizontal.svg';
import { FiMoon, FiSun } from 'react-icons/fi';

import { SearchContextProvider } from './context/SearchContext';
import LoginView from './views/LoginView';
import { useLoggedIn } from './hooks/hooks';
import jwtDecode from 'jwt-decode';

interface Token {
	exp: number;
	[key: string]: any;
}

export default function App() {
	const isLoggedIn = useLoggedIn();
	const { colorMode, toggleColorMode } = useColorMode();
	const { refreshTokenMutation } = useRefreshToken();

	const authToken = sessionStorage.getItem('authToken');
	const refreshToken = sessionStorage.getItem('refreshToken');

	// Check if authToken is about to expire or has already expired
	useEffect(() => {
		const timer = setInterval(() => {
			// Check if authToken is about to expire or has already expired
			// If so, use the refreshToken to get a new authToken
			if (!authToken || !refreshToken) return;

			const decoded = jwtDecode<Token>(authToken);
			const currentTime = Math.floor(Date.now() / 1000);
			const timeLeft = decoded.exp - currentTime;

			if (timeLeft < 60) {
				// If authToken is about to expire, get a new one
				refreshTokenMutation(refreshToken)
					.then((result) => {
						const { authToken } = result.data.refreshJwtAuthToken;
						sessionStorage.setItem('authToken', authToken);
					})
					.catch((err) => {
						console.error(err);
					});
			}
		}, 10000);

		return () => {
			clearInterval(timer);
		};
	}, [authToken, refreshToken]);

	return (
		<SearchContextProvider>
			<Stack direction='column' alignItems='center' minH='100vh'>
				{isLoggedIn ? (
					<>
						<Header />
						<Main />
						<Footer />
					</>
				) : (
					<Stack alignItems='center' justifyContent='center' w='100vw' h='100vh'>
						<Center>
							<Image
								src={logo}
								alt='Get To Work logo'
								loading='eager'
								w='3xl'
								h='auto'
								pos='absolute'
								top={4}
							/>
						</Center>
						<Box pos='relative' bottom={4} w='auto' minW='md'>
							<LoginView />
						</Box>
					</Stack>
				)}
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
