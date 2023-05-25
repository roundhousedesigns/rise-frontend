import { SetStateAction, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
	Button,
	Flex,
	Container,
	Heading,
	Box,
	Spinner,
	Link,
	Text,
	Divider,
} from '@chakra-ui/react';

import { handleReCaptchaVerify } from '../lib/utils';
import { LoginInput } from '../lib/types';
import TextInput from '../components/common/inputs/TextInput';
import { useLogin } from '../hooks/mutations/useLogin';
import { useLoginError } from '../hooks/hooks';

export default function LoginView() {
	const { VITE_DEV_MODE } = import.meta.env;

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

	const errorMessage = useLoginError(errorCode);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		handleReCaptchaVerify({ label: 'login', executeRecaptcha })
			.then((token) => {
				if (!token) {
					setErrorCode('recaptcha_error');
					return;
				}

				loginMutation({ ...credentials, reCaptchaToken: token })
					.then(() => {
						window.location.reload();
					})
					.catch((errors: { message: SetStateAction<string> }) => setErrorCode(errors.message));
			})
			.catch((error) => {
				setErrorCode('recaptcha_error');
			});
	};

	return (
		<Container maxW='2xl' py={4}>
			<Heading variant='pageTitle'>Welcome</Heading>
			<Text variant='sans' fontSize='lg'>
				You'll need an account to create a profile or to search for candidates.
			</Text>
			<Divider my={4} />
			<Flex my={4} gap={14} alignItems='flex-start' flexWrap='wrap'>
				<Box flex='1 0 300px'>
					<Heading variant='pageSubtitle' fontSize='2xl'>
						Please sign in.
					</Heading>
					<form onSubmit={handleLoginSubmit}>
						<TextInput
							value={credentials.login}
							name='login'
							label='Email'
							autoComplete='username'
							isRequired
							onChange={handleInputChange}
							error={errorMessage}
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
							{VITE_DEV_MODE ? (
								<Text variant='devMessage' flex='1'>
									Lost Password disabled in dev environment
								</Text>
							) : (
								<Link as={RouterLink} to='/lost-password' fontSize='md'>
									Lost your password?
								</Link>
							)}
							<Box id='recaptcha-badge' />
						</Flex>
					</form>
				</Box>
				<Box textAlign='center' flex='1'>
					<Heading variant='pageSubtitle' fontSize='2xl'>
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
