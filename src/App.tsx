import React from 'react';
import { Stack } from '@chakra-ui/react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';

export default function App() {
	return (
		<Stack direction="column" alignItems="center" minH="100vh">
			<Header />
			<Main />
			<Footer />
		</Stack>
	);
}
