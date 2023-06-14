import { useLocation } from 'react-router-dom';
import { Container, Heading, Skeleton } from '@chakra-ui/react';
import useViewer from '../hooks/queries/useViewer';
import LoginView from '../views/LoginView';

interface Props {
	hideOnly?: boolean; // Only hide the child element, don't show the login view.
	children: React.ReactNode;
}

export default function LoggedIn({ hideOnly, children }: Props): JSX.Element {
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
	) : (!hideOnly && !loggedInId && publicEndpoints.includes(pathname)) || loggedInId ? (
		<>{children}</>
	) : (
		<Container maxW='2xl' p={0} mt={8}>
			<Heading as='h2' variant='pageTitle' mb={0} px={4}>
				Please sign in
			</Heading>
			<LoginView />
		</Container>
	);
}
