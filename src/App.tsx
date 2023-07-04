import { useEffect, useRef, useState } from 'react';
import { Box, Spinner, Stack } from '@chakra-ui/react';

import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';

import { SearchContextProvider } from './context/SearchContext';
import useViewer from './hooks/queries/useViewer';

export default function App() {
	const {
		result: { loading },
	} = useViewer();

	// Get the header height so we can offset the main content
	const headerRef = useRef(null);
	const [headerHeight, setHeaderHeight] = useState<number>(0);

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { height } = entry.contentRect;
				setHeaderHeight(height);
			}
		});

		if (headerRef.current) {
			observer.observe(headerRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [headerRef.current]);

	return (
		<SearchContextProvider>
			<Stack
				direction='column'
				alignItems='center'
				minH='-webkit-fill-available'
				_dark={{
					bg: 'gray.900',
					color: 'text.light',
				}}
				_light={{
					bg: 'gray.50',
					color: 'text.dark',
				}}
			>
				<Header ref={headerRef} />
				<Box minH='66vh' w='full' paddingTop={`${headerHeight}px`}>
					{loading ? <Spinner /> : <Main />}
				</Box>
				<Footer />
			</Stack>
		</SearchContextProvider>
	);
}
