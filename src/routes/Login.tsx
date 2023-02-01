import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import Page from '../components/common/Page';
import LoginView from '../views/LoginView';

export default function Login() {
	const { loggedInUser } = useContext(AuthContext);
	const navigate = useNavigate();

	/**
	 * Check for changes in login status and redirect to login page if user is not logged in.
	 */
	useEffect(() => {
		if (loggedInUser) {
			navigate('/');
		}
	}, [loggedInUser]);

	return (
		<Page title='Welcome'>
			<LoginView />
		</Page>
	);
}
