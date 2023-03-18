import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoggedIn } from '../hooks/hooks';

interface Props {
	redirect?: boolean;
	children: React.ReactNode;
}

export default function LoggedIn({ redirect, children }: Props) {
	const isLoggedIn = useLoggedIn();
	const navigate = useNavigate();

	useEffect(() => {
		if (redirect && !isLoggedIn) {
			navigate('/login');
		}
	}, [isLoggedIn, redirect]);

	return <>{children}</>;
}
