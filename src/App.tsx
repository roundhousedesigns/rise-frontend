import { Box, Stack, Image, Center, IconButton, useColorMode } from '@chakra-ui/react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import logo from './assets/images/gtw-logo-horizontal.svg';
import { FiMoon, FiSun } from 'react-icons/fi';

import { SearchContextProvider } from './context/SearchContext';
import LoginView from './views/LoginView';

import { useViewer } from './hooks/queries/useViewer';
import { useLocation } from 'react-router-dom';
import RegisterView from './views/RegisterView';

export default function App() {
	const { loggedInId } = useViewer();
	const { colorMode, toggleColorMode } = useColorMode();

	// get the current route
	const { pathname } = useLocation();

	return (
		<SearchContextProvider>
			<Stack direction='column' alignItems='center' minH='100vh'>
				{loggedInId ? (
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
						<Box pos='relative' bottom={4} w='full' minW='md' maxW='4xl' px={4}>
							{pathname === '/register' ? <RegisterView /> : <LoginView />}
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
