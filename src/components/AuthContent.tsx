import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

interface Props {
	children: React.ReactNode;
}

export default function AuthContent({ children }: Props): React.ReactNode {
	const { loggedInUser } = useContext(AuthContext);
	const navigate = useNavigate();

	// Redirect to login page if user is not logged in.
	if (!loggedInUser) navigate('/login');

	return <>{children}</>;
}
