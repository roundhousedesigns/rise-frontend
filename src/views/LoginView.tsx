import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button, Flex, Container, Heading, Box, Spinner, Link } from '@chakra-ui/react';

import { LoginInput } from '../lib/types';
import TextInput from '../components/common/inputs/TextInput';
import { useLogin } from '../hooks/mutations/useLogin';
import { useLoginError } from '../hooks/hooks';

export default function LoginView() {
	const [credentials, setCredentials] = useState<LoginInput>({
		login: '',
		password: '',
		reCaptchaToken: '',
	});
	const { reCaptchaToken } = credentials;
	const [errorCode, setErrorCode] = useState<string>('');
	const {
		loginMutation,
		results: { loading: submitLoading },
	} = useLogin();
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleReCaptchaVerify = useCallback(async () => {
		if (!executeRecaptcha) {
			return;
		}

		const token = await executeRecaptcha('loginUser');
		setCredentials({
			...credentials,
			reCaptchaToken: token,
		});
	}, [executeRecaptcha]);

	// Trigger the verification as soon as the component is loaded
	useEffect(() => {
		handleReCaptchaVerify();
	}, [handleReCaptchaVerify]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const errorMessage = useLoginError(errorCode);

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!reCaptchaToken) {
			setErrorCode('recaptcha_error');
			return;
		}

		loginMutation(credentials)
			.then(() => {
				window.location.reload();
			})
			.catch((errors: { message: SetStateAction<string> }) => setErrorCode(errors.message));
	};

	return (
		<Container maxW='lg' py={4}>
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
						<Box id='recaptcha-badge' />
						<Link as={RouterLink} to='/lost-password' fontSize='md'>
							Lost your password?
						</Link>
					</Flex>
					<Link as={RouterLink} textAlign='left' my={4} fontSize='sm' to='/register'>
						Don't have an account? Register for one here.
					</Link>
				</form>
			</Box>
		</Container>
	);
}
