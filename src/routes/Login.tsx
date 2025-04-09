import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Shell from '@layout/Shell';
import LoginView from '@views/LoginView';
import useViewer from '@queries/useViewer';

export default function Login() {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const alert = params.get('alert');
	const alertStatus = params.get('alertStatus');

	const [{ loggedInId }] = useViewer();

	// If the user is logged in, redirect them to the home page.
	useEffect(() => {
		if (loggedInId) {
			navigate('/');
		}
	});

	return (
		<Shell title={'Sign in to RISE'} mx='auto'>
			<LoginView alert={alert ? alert : ''} alertStatus={alertStatus ? alertStatus : ''} />
		</Shell>
	);
}
