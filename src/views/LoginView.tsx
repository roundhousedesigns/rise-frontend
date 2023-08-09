import { ChangeEvent, FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
	Button,
	Flex,
	Container,
	Heading,
	Box,
	Link,
	Text,
	Divider,
	Alert,
} from '@chakra-ui/react';

import { handleReCaptchaVerify } from '../lib/utils';
import { LoginInput } from '../lib/types';
import TextInput from '../components/common/inputs/TextInput';
import useLogin from '../hooks/mutations/useLogin';
import { useErrorMessage } from '../hooks/hooks';

interface Props {
	alert?: string;
	alertStatus?: string;
}

export default function LoginView({ alert, alertStatus }: Props) {
	const [credentials, setCredentials] = useState<LoginInput>({
		login: '',
		password: '',
		reCaptchaToken: '',
	});
	const [errorCode, setErrorCode] = useState<string>('');
	const {
		loginMutation,
		results: { loading: submitLoading },
	} = useLogin();
	const { executeRecaptcha } = useGoogleReCaptcha();
	const navigate = useNavigate();

	const errorMessage = useErrorMessage(errorCode);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const handleLoginSubmit = (e: FormEvent) => {
		e.preventDefault();

		handleReCaptchaVerify({ label: 'login', executeRecaptcha })
			.then((token) => {
				if (!token) {
					setErrorCode('recaptcha_error');
					return;
				}

				loginMutation({ ...credentials, reCaptchaToken: token })
					.then((res) => {
						if (res.data.loginWithCookiesAndReCaptcha.status === 'SUCCESS') {
							navigate('');
						}
					})
					.catch((errors: { message: string }) => setErrorCode(errors.message));
			})
			.catch(() => {
				setErrorCode('recaptcha_error');
			});
	};

	const sanitizedAlertStatus = alertStatus === 'error' ? 'error' : 'success';

	return (
		<Container maxW='2xl' py={4}>
			<Text fontSize='lg'>
				You'll need an account to create a profile or to search for candidates.
			</Text>
			<Divider my={4} />
			<Flex my={4} gap={14} alignItems='flex-start' flexWrap='wrap'>
				<Box flex='1 1 auto'>
					<Heading as='h3' variant='pageSubtitle' fontSize='2xl'>
						Please sign in.
					</Heading>
					{alert ? <Alert status={sanitizedAlertStatus}>{alert}</Alert> : false}
					<form onSubmit={handleLoginSubmit}>
						<TextInput
							value={credentials.login}
							name='login'
							label='Email'
							autoComplete='username'
							isRequired
							onChange={handleInputChange}
							error={['invalid_username', 'invalid_email'].includes(errorCode) ? errorMessage : ''}
							inputProps={{
								autoComplete: 'username',
								fontSize: 'lg',
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
								fontSize: 'lg',
							}}
						/>
						<Flex gap={4} alignItems='center' justifyContent='space-between' mt={4} flexWrap='wrap'>
							<Button type='submit' colorScheme='blue' px={6} isLoading={!!submitLoading}>
								Submit
							</Button>
							<Link as={RouterLink} to='/lost-password' fontSize='md'>
								Lost your password?
							</Link>
							<Box id='recaptcha-badge' />
						</Flex>
					</form>
				</Box>
				<Box textAlign='center' flex='1'>
					<Heading as='h3' variant='pageSubtitle' fontSize='2xl'>
						Don't have an account?
					</Heading>
					<Button
						as={RouterLink}
						to='/register'
						borderRadius={{ base: 'md', md: 'lg' }}
						bgColor='brand.orange'
						_hover={{
							bgColor: 'orange.300',
						}}
						color='text.dark'
						size='lg'
					>
						Sign Up Here
					</Button>
				</Box>
			</Flex>
		</Container>
	);
}
