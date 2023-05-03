import Page from '../components/Page';
import LoginView from '../views/LoginView';
import { useViewer } from '../hooks/queries/useViewer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const navigate = useNavigate();

	// If the user is logged in, redirect them to the home page.
	useEffect(() => {
		if (loggedInId) {
			navigate('/');
		}
	});

	const { loggedInId } = useViewer();

	return (
		<Page>
			<LoginView />
		</Page>
	);
}
