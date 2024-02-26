import { ChangeEvent, FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
	Button,
	Flex,
	Heading,
	Link,
	Text,
	Divider,
	Alert,
	Box,
	Spacer,
} from '@chakra-ui/react';
import { handleReCaptchaVerify } from '@lib/utils';
import { LoginInput } from '@lib/types';
import ContentView from '@views/ContentView';
import { useErrorMessage } from '@hooks/hooks';
import useLogin from '@hooks/mutations/useLogin';
import TextInput from '@common/inputs/TextInput';

interface Props {
	alert?: string;
	alertStatus?: string;
	hideContent?: boolean;
}

export default function LoginView({ alert, alertStatus, hideContent }: Props) {
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
							navigate('/');
						}
					})
					.catch((errors: { message: string }) => {
						setErrorCode(errors.message);
					});
			})
			.catch(() => {
				setErrorCode('recaptcha_error');
			});
	};

	const sanitizedAlertStatus = alertStatus === 'error' ? 'error' : 'success';

	return (
		<Flex alignItems='flex-start' gap={12} flexWrap='wrap'>
			<Box flex='1'>
				<Text fontSize='lg'>
					You'll need an account to create a profile or to search for candidates.
				</Text>
				<Divider my={4} />
				<Box flex='1 1 auto'>
					{alert ? <Alert status={sanitizedAlertStatus}>{alert}</Alert> : false}
					<form onSubmit={handleLoginSubmit}>
						<TextInput
							value={credentials.login}
							name='login'
							label='Email'
							autoComplete='username'
							isRequired
							onChange={handleInputChange}
							error={
								['invalid_username', 'invalid_email', 'invalid_account'].includes(errorCode)
									? errorMessage
									: ''
							}
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
							<Link as={RouterLink} to='/lost-password' fontSize='sm'>
								Lost your password?
							</Link>
						</Flex>
						<Box id='recaptcha-badge' />
						<Divider />
						<Box textAlign='center' flex='1'>
							<Heading variant='pageSubtitle' fontSize='xl'>
								Don't have an account?
							</Heading>
							<Button
								as={RouterLink}
								to='/register'
								borderRadius={{ base: 'md', md: 'lg' }}
								colorScheme='green'
								color='text.dark'
								size='lg'
							>
								Sign Up
							</Button>
						</Box>
					</form>
				</Box>
				<Spacer h={20} />
			</Box>

			{!hideContent ? (
				<Box flex={{ base: '0 0 100%', md: '1' }} mt={0} pt={0}>
					<ContentView postId='12238' mt={0} pt={0} />
					<Button
						as={Link}
						href='https://risetheatre.org'
						isExternal
						size='xl'
						colorScheme='yellow'
						mt={2}
					>
						Learn about RISE Theatre
					</Button>
				</Box>
			) : (
				false
			)}
		</Flex>
	);
}
