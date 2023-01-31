import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import Page from '../components/common/Page';
import LoginView from '../views/LoginView';

export default function Login() {
	const { userIsLoggedIn } = React.useContext(AuthContext);
	const navigate = useNavigate();

	/**
	 * Check for changes in login status and redirect to login page if user is not logged in.
	 */
	useEffect(() => {
		if (userIsLoggedIn === true) {
			navigate('/');
		}
	}, [userIsLoggedIn]);

	return (
		<Page title="Welcome">
			<LoginView />
		</Page>
	);
}
