import { Stack, IconButton, useColorMode } from '@chakra-ui/react';

import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import { FiMoon, FiSun } from 'react-icons/fi';

import { SearchContextProvider } from './context/SearchContext';

import { useViewer } from './hooks/queries/useViewer';
import LoginView from './views/LoginView';

export default function App() {
	const { loggedInId } = useViewer();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<SearchContextProvider>
			<Stack
				direction='column'
				alignItems='center'
				minH='100vh'
				_dark={{
					bg: 'text.dark',
					color: 'text.light',
				}}
				_light={{
					bg: 'text.light',
					color: 'text.dark',
				}}
			>
				<Header />
				{loggedInId ? <Main /> : <LoginView />}
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
