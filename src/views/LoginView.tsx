import { SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Flex, Container, Heading, Box, Spinner } from '@chakra-ui/react';

import TextInput from '../components/common/inputs/TextInput';
import { useLogin } from '../hooks/mutations/useLogin';
import { useLoginError } from '../hooks/hooks';

export default function LoginView() {
	const [credentials, setCredentials] = useState<{ login: string; password: string }>({
		login: '',
		password: '',
	});
	const [errorCode, setErrorCode] = useState<string>('');
	const {
		loginMutation,
		results: { loading: submitLoading },
	} = useLogin();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const navigate = useNavigate();
	const errorMessage = useLoginError(errorCode);

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loginMutation(credentials)
			.then(() => {
				window.location.reload();
			})
			.catch((errors: { message: SetStateAction<string> }) => setErrorCode(errors.message));
	};

	return (
		<Container>
			<Heading size='lg'>Please sign in.</Heading>
			<Box my={4}>
				<form onSubmit={handleLoginSubmit}>
					<TextInput
						value={credentials.login}
						name='login'
						label='Email'
						autoComplete='username'
						isRequired
						onChange={handleInputChange}
						error={
							errorCode === 'invalid_username' ||
							errorCode === 'invalid_email' ||
							errorCode === 'empty_login'
								? errorMessage
								: ''
						}
						inputProps={{
							autoComplete: 'username',
						}}
					/>
					<TextInput
						value={credentials.password}
						name='password'
						label='Password'
						isRequired
						onChange={handleInputChange}
						error={errorCode === 'incorrect_password' ? errorMessage : ''}
						inputProps={{
							type: 'password',
							autoComplete: 'current-password',
						}}
					/>
					<Flex gap={4} alignItems='center' justifyContent='space-between' mt={4} flexWrap='wrap'>
						<Button type='submit' colorScheme='blue' px={6}>
							{submitLoading ? <Spinner size='sm' /> : 'Submit'}
						</Button>
						<Button variant='link' as={Link} to='/lost-password'>
							Lost your password?
						</Button>
						<Button
							colorScheme='orange'
							variant='solid'
							width='full'
							onClick={() => navigate('/register')}
							flex='0 0 100%'
						>
							Join the Directory
						</Button>
					</Flex>
				</form>
			</Box>
		</Container>
	);
}
