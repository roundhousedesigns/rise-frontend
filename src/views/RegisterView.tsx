import { SetStateAction, useEffect, useState } from 'react';
import {
	chakra,
	Button,
	FormErrorMessage,
	Box,
	Stack,
	Spinner,
	Checkbox,
	Link,
	FormControl,
	Divider,
	Heading,
} from '@chakra-ui/react';
import parse from 'html-react-parser';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import TextInput from '../components/common/inputs/TextInput';
import { useRegisterUser } from '../hooks/mutations/useRegisterUser';
import { useRegistrationError } from '../hooks/hooks';
import { RegisterUserInput } from '../lib/types';
import { usePostContent } from '../hooks/queries/usePostContent';

export default function RegisterView() {
	const [userFields, serUserFields] = useState<RegisterUserInput>({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
	});
	const { email, firstName, lastName, password, confirmPassword } = userFields;
	const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
	const [ofAge, setOfAge] = useState<boolean>(false);
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');

	const [content, { contentLoading, contentError }] = usePostContent('576');

	const {
		registerUserMutation,
		results: { loading: submitLoading },
	} = useRegisterUser();

	// useEffect to check if form is valid
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
		serUserFields({
			...userFields,
			[e.target.name]: e.target.value,
		});
	};

	const navigate = useNavigate();

	const errorMessage = useRegistrationError(errorCode);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		registerUserMutation(userFields)
			.then(() => {
				navigate('/login');
			})
			.catch((errors: { message: SetStateAction<string> }) => setErrorCode(errors.message));
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
				<Box my={4}>{parse(content)}</Box>
			) : (
				false
			)}

			<Divider my={6} />

			<Heading variant='contentTitle'>Create an account</Heading>
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
					isRequired
					onChange={handleInputChange}
					inputProps={{
						size: 'xl',
						autoComplete: 'email',
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
						}}
					/>
				</Stack>
				<Box mt={4}>
					<FormControl>
						<Checkbox size='sm' w='full' isRequired onChange={() => setOfAge(!ofAge)}>
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
						>
							I have read and accept the RISE Theatre Directory{' '}
							<Link as={RouterLink} to='http://risetheartre.org/terms-conditions' isExternal>
								Terms and Conditions
							</Link>{' '}
							and{' '}
							<Link as={RouterLink} to='http://risetheartre.org/privacy-policy' isExternal>
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
					>
						{submitLoading ? <Spinner size='sm' /> : 'Create account'}
					</Button>
					<FormErrorMessage mt={0}>{errorMessage}</FormErrorMessage>
				</Box>
			</form>
		</>
	);
}
