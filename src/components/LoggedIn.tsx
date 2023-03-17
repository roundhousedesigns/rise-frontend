import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
	redirect?: boolean;
	children: React.ReactNode;
}

export default function LoggedIn({ redirect, children }: Props) {
	const { authToken } = sessionStorage.get('loggedInUser');
	const navigate = useNavigate();

	useEffect(() => {
		if (redirect && !authToken) {
			navigate('/login');
		}
	}, [authToken]);

	return <>{children}</>;
}
