import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Props {
	redirect?: boolean;
	children: React.ReactNode;
}

export default function LoggedIn({ redirect, children }: Props) {
	const {
		loggedInUser: { id: loggedInId },
	} = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (redirect && loggedInId === 0) {
			navigate('/login');
		}
	}, [loggedInId]);

	return <>{children}</>;
}
