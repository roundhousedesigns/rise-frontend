import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Page from '../components/Page';
import LoginView from '../views/LoginView';
import useViewer from '../hooks/queries/useViewer';

export default function Login() {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const alert = params.get('alert');
	const alertStatus = params.get('alertStatus');

	const { loggedInId } = useViewer();

	// If the user is logged in, redirect them to the home page.
	useEffect(() => {
		if (loggedInId) {
			navigate('/');
		}
	});

	return (
		<Page>
			<LoginView alert={alert ? alert : ''} alertStatus={alertStatus ? alertStatus : ''} />
		</Page>
	);
}
