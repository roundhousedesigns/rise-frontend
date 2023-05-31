import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Spinner, Stack } from '@chakra-ui/react';

import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';

import { SearchContextProvider } from './context/SearchContext';
import useViewer from './hooks/queries/useViewer';

export default function App() {
	const {
		loggedInId,
		result: { loading },
	} = useViewer();

	const navigate = useNavigate();

	// get the current route
	const { pathname } = useLocation();

	// URL endpoints to be allowed when logged out
	const publicEndpoints = ['/register', '/login', '/lost-password', '/reset-password'];

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

	// if the user is not logged in, redirect to the login page
	useEffect(() => {
		if (loading) return;

		if (!loggedInId && !publicEndpoints.includes(pathname)) {
			navigate('/login');
		}
	}, [loading, loggedInId, pathname]);

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
				<Header ref={headerRef} />
				<Box minH='66vh' w='full' paddingTop={`${headerHeight}px`}>
					{loading ? <Spinner /> : <Main />}
				</Box>
				<Footer />
			</Stack>
		</SearchContextProvider>
	);
}
