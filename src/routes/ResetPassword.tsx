import { useSearchParams } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import Page from '../components/Page';
import ResetPasswordView from '../views/ResetPasswordView';

export default function ResetPassword() {
	// Get the token from the URL
	const [params] = useSearchParams();
	const key = params.get('key');
	const login = params.get('login');

	return (
		<Page>
			{key && login ? (
				<ResetPasswordView token={key} login={login} />
			) : (
				<Text size='md'>Invalid password reset link.</Text>
			)}
		</Page>
	);
}
