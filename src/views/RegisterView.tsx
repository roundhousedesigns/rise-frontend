import { SetStateAction, useEffect, useState } from 'react';
import {
	chakra,
	Button,
	Box,
	Stack,
	Spinner,
	Checkbox,
	Link,
	FormControl,
	Divider,
	Heading,
	useToast,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { handleReCaptchaVerify } from '../lib/utils';
import TextInput from '../components/common/inputs/TextInput';
import useRegisterUser from '../hooks/mutations/useRegisterUser';
import { useRegistrationError } from '../hooks/hooks';
import { RegisterUserInput } from '../lib/types';
import usePostContent from '../hooks/queries/usePostContent';

export default function RegisterView() {
	const [userFields, setUserFields] = useState<RegisterUserInput>({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		reCaptchaToken: '',
	});
	const { email, firstName, lastName, password, confirmPassword } = userFields;
	const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
	const [ofAge, setOfAge] = useState<boolean>(false);
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');

	const [content, { contentLoading, contentError }] = usePostContent('576');

	const { executeRecaptcha } = useGoogleReCaptcha();

	const {
		registerUserMutation,
		results: { loading: submitLoading },
	} = useRegisterUser();

	// Check if form is valid
	useEffect(() => {
		setFormIsValid(
			email.length > 0 &&
				firstName.length > 0 &&
				lastName.length > 0 &&
				password.length > 0 &&
				confirmPassword.length > 0 &&
				passwordsMatch &&
				ofAge &&
				termsAccepted
		);
	}, [email, firstName, lastName, passwordsMatch, password, confirmPassword, ofAge, termsAccepted]);

	// useEffect to check if passwords match, debounce to prevent spamming
	useEffect(() => {
		const timer = setTimeout(() => {
			setPasswordsMatch(password === confirmPassword);
		}, 500);
		return () => clearTimeout(timer);
	}, [password, confirmPassword]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserFields({
			...userFields,
			[e.target.name]: e.target.value,
		});
	};

	const navigate = useNavigate();
	const toast = useToast();
	const errorMessage = useRegistrationError(errorCode);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		handleReCaptchaVerify({ label: 'registerUser', executeRecaptcha }).then((token) => {
			if (!token) {
				setErrorCode('recaptcha_error');
				return;
			}

			registerUserMutation({ ...userFields, reCaptchaToken: token })
				.then(() => {
					toast({
						title: 'Account created!',
						description: 'Please check your inbox for confirmation.',
						status: 'success',
						duration: 5000,
						isClosable: true,
						position: 'top',
					});
				})
				.then(() => {
					navigate('/login');
				})
				.catch((errors: { message: SetStateAction<string> }) => setErrorCode(errors.message));
		});
	};

	const passwordsMatchError = () => {
		return passwordsMatch || (!passwordsMatch && (!password || !confirmPassword))
			? ''
			: 'Passwords do not match';
	};

	return (
		<>
			{contentLoading ? (
				<Spinner />
			) : contentError ? (
				'Error loading content'
			) : content ? (
				<Box my={4}>{content}</Box>
			) : (
				false
			)}

			<Divider my={6} />

			<Heading as='h2' variant='contentTitle'>
				Create an account
			</Heading>
			<form onSubmit={handleSubmit}>
				<Stack direction='row' spacing={6}>
					<TextInput
						value={firstName}
						name='firstName'
						isRequired
						onChange={handleInputChange}
						flex='1'
						label='First name'
						inputProps={{
							size: 'xl',
							autoComplete: 'given-name',
							tabIndex: 1,
						}}
					/>
					<TextInput
						value={lastName}
						name='lastName'
						isRequired
						onChange={handleInputChange}
						flex='1'
						label='Last name'
						inputProps={{
							size: 'xl',
							autoComplete: 'family-name',
							tabIndex: 2,
						}}
					/>
				</Stack>
				<TextInput
					value={email}
					name='email'
					id='email'
					type='email'
					variant='filled'
					label='Email address'
					error={errorMessage}
					isRequired
					onChange={handleInputChange}
					inputProps={{
						size: 'xl',
						autoComplete: 'email',
						tabIndex: 3,
					}}
				/>
				<Stack direction='row' spacing={6}>
					<TextInput
						value={password}
						name='password'
						id='password'
						type='password'
						variant='filled'
						label='Password'
						isRequired
						onChange={handleInputChange}
						inputProps={{
							size: 'xl',
							type: 'password',
							autoComplete: 'new-password',
							tabIndex: 4,
						}}
					/>
					<TextInput
						value={confirmPassword}
						name='confirmPassword'
						id='confirmPassword'
						type='password'
						variant='filled'
						label='Confirm your password'
						isRequired
						error={passwordsMatchError()}
						onChange={handleInputChange}
						inputProps={{
							size: 'xl',
							type: 'password',
							autoComplete: 'new-password',
							tabIndex: 5,
						}}
					/>
				</Stack>
				<Box mt={4}>
					<FormControl>
						<Checkbox size='sm' w='full' isRequired onChange={() => setOfAge(!ofAge)} tabIndex={6}>
							I am over 18 years of age.
							<chakra.span color='red.300' ml={1}>
								*
							</chakra.span>
						</Checkbox>
					</FormControl>
					<FormControl>
						<Checkbox
							size='sm'
							w='full'
							isRequired
							onChange={() => setTermsAccepted(!termsAccepted)}
							tabIndex={7}
						>
							I have read and accept the RISE Theatre Directory{' '}
							<Link as={RouterLink} to='http://risetheatre.org/terms-conditions' isExternal>
								Terms and Conditions
							</Link>{' '}
							and{' '}
							<Link as={RouterLink} to='http://risetheatre.org/privacy-policy' isExternal>
								Privacy Policy
							</Link>
							.
							<chakra.span color='red.300' ml={1}>
								*
							</chakra.span>
						</Checkbox>
					</FormControl>
					<Button
						mt={2}
						type='submit'
						colorScheme='orange'
						isDisabled={!formIsValid || submitLoading}
						tabIndex={8}
					>
						{submitLoading ? <Spinner size='sm' /> : 'Create account'}
					</Button>
				</Box>
			</form>
		</>
	);
}
