import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from '../hooks/hooks';

interface Props {
	redirect?: boolean;
	children: React.ReactNode;
}

const publicRoutes = ['login', 'register'];

export default function LoggedIn({ redirect, children }: Props) {
	// TODO set up a hook to manage logged in state.
	const isLoggedIn = useLoggedIn();
	const navigate = useNavigate();

	useEffect(() => {
		if (redirect && !isLoggedIn && !publicRoutes.includes(window.location.pathname)) {
			navigate('/login');
		}
	}, [isLoggedIn, redirect]);

	return <>{children}</>;
}
