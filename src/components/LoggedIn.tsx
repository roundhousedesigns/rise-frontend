import { useLocation } from 'react-router-dom';
import useViewer from '../hooks/queries/useViewer';
import LoginView from '../views/LoginView';
import { Skeleton } from '@chakra-ui/react';

interface Props {
	children: React.ReactNode;
}

export default function LoggedIn({ children }: Props) {
	const {
		loggedInId,
		result: { loading },
	} = useViewer();

	// get the current route
	const { pathname } = useLocation();

	// Allowed URL endpoints when logged out
	const publicEndpoints = ['/register', '/login', '/lost-password', '/reset-password'];

	return loading ? (
		<Skeleton />
	) : (!loggedInId && publicEndpoints.includes(pathname)) || loggedInId ? (
		children
	) : (
		<LoginView />
	);
}
