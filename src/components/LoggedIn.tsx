import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Spinner } from '@chakra-ui/react';
import LoginView from '@views/LoginView';
import useViewer from '@queries/useViewer';

interface Props {
	hideOnly?: boolean;
	children: ReactNode;
}

/**
 * Renders the children component if the user is logged in, otherwise displays the login view.
 *
 * @param {Props} props - Component props
 * @param {boolean} props.hideOnly -  Determines whether to hide the child component or not. Defaults to false.
 * @param {ReactNode} props.children - The component to render if the user is logged in.
 */
export default function LoggedIn({ hideOnly, children }: Props): JSX.Element {
	const [{ loggedInId }, { loading }] = useViewer();

	// get the current route
	const { pathname } = useLocation();

	// Allowed URL endpoints when logged out
	const publicEndpoints = ['/register', '/login', '/lost-password', '/reset-password'];

	const showContent =
		(!hideOnly && !loggedInId && publicEndpoints.includes(pathname)) || loggedInId;

	return loading ? (
		<Spinner />
	) : showContent ? (
		<>{children}</>
	) : (
		<Container p={0} mt={8} maxW='4xl'>
			<LoginView signInTitle={true} />
		</Container>
	);
}
