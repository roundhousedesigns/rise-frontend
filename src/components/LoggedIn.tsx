import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Skeleton } from '@chakra-ui/react';
import LoginView from '@views/LoginView';
import useViewer from '@hooks/queries/useViewer';

interface Props {
	hideOnly?: boolean; // Only hide the child element, don't show the login view.
	children: ReactNode;
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
		<Box p={0} mt={8}>
			<LoginView signInTitle={true} />
		</Box>
	);
}
