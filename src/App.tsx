import { Stack } from '@chakra-ui/react';

import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';

import { SearchContextProvider } from './context/SearchContext';

import { useViewer } from './hooks/queries/useViewer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './routes/Login';

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
				{!loggedInId && !publicEndpoints.includes(pathname) && !loading ? <Login /> : <Main />}
				<Footer />
			</Stack>
		</SearchContextProvider>
	);
}
