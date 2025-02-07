import { ChangeEvent, FormEvent, SetStateAction, useEffect, useState } from 'react';
import {
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
	Flex,
	useMediaQuery,
	chakra,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { handleReCaptchaVerify } from '@lib/utils';
import TextInput from '@common/inputs/TextInput';
import useRegisterUser from '@mutations/useRegisterUser';
import { useErrorMessage, useValidatePassword } from '@hooks/hooks';
import usePageById from '@queries/usePageById';
import { RegisterUserInput } from '@lib/types';
import BackToLoginButton from '@common/BackToLoginButton';
import RequiredAsterisk from '@common/RequiredAsterisk';

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
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
	const [passwordStrongEnough, setPasswordStrongEnough] = useState<boolean>(false);
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');
	const [page, { pageLoading, pageError }] = usePageById(576);

	const passwordStrength = useValidatePassword(password);

	const { executeRecaptcha } = useGoogleReCaptcha();

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const {
		registerUserMutation,
		results: { loading: submitLoading },
	} = useRegisterUser();

	// Check if form is valid
	useEffect(() => {
		if (!passwordsMatch) return setErrorCode('password_mismatch');
		else if (password.length && !passwordStrongEnough) return setErrorCode('password_too_weak');
		else
			setFormIsValid(
				email.length > 0 &&
					firstName.length > 0 &&
					lastName.length > 0 &&
					password.length > 0 &&
					confirmPassword.length > 0 &&
					passwordStrongEnough &&
					passwordsMatch &&
					ofAge &&
					termsAccepted
			);
		setErrorCode('');
	}, [
		email,
		firstName,
		lastName,
		password,
		confirmPassword,
		passwordStrongEnough,
		passwordsMatch,
		ofAge,
		termsAccepted,
	]);

	// useEffect to check if passwords match, debounce to prevent spamming
	useEffect(() => {
		const timer = setTimeout(() => {
			setPasswordStrongEnough(passwordStrength === 'strong');
			setPasswordsMatch(password === confirmPassword);
		}, 500);
		return () => clearTimeout(timer);
	}, [password, confirmPassword]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserFields({
			...userFields,
			[e.target.name]: e.target.value,
		});
	};

	const navigate = useNavigate();
	const toast = useToast();
	const errorMessage = useErrorMessage(errorCode);

	const handleSubmit = (e: FormEvent) => {
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
						duration: 3000,
						isClosable: true,
						position: 'bottom',
					});
				})
				.then(() => {
					navigate('/login');
				})
				.catch((errors: { message: SetStateAction<string> }) => setErrorCode(errors.message));
		});
	};

	return (
		<>
			{pageLoading ? (
				<Spinner />
			) : pageError ? (
				'Error loading content'
			) : page ? (
				<Box my={4}>{page.content}</Box>
			) : (
				false
			)}

			<Divider my={6} />

			<Heading as='h2' variant='contentTitle'>
				Create an account
			</Heading>
			<chakra.form onSubmit={handleSubmit}>
				<Stack direction='row' spacing={6}>
					<TextInput
						value={firstName}
						name='firstName'
						isRequired
						onChange={handleInputChange}
						flex='1'
						label={'First name'}
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
						label={'Last name'}
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
					label={'Email address'}
					error={
						errorCode !== 'password_too_weak' && errorCode !== 'password_mismatch' && errorCode
							? errorMessage
							: ''
					}
					isRequired
					onChange={handleInputChange}
					inputProps={{
						size: 'xl',
						autoComplete: 'email',
						tabIndex: 3,
					}}
				/>
				<Stack direction='row' spacing={6} flexWrap='wrap'>
					<TextInput
						value={password}
						name='password'
						id='password'
						type='password'
						variant='filled'
						label='Password'
						helperText='Passwords must have at least one lowercase letter, one uppercase letter, one number, and one special character.'
						flex={1}
						isRequired
						error={errorCode && errorCode === 'password_too_weak' ? errorMessage : ''}
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
						label={'Confirm your password'}
						flex={1}
						isRequired
						error={errorCode && errorCode === 'password_mismatch' ? errorMessage : ''}
						onChange={handleInputChange}
						inputProps={{
							size: 'xl',
							type: 'password',
							autoComplete: 'new-password',
							tabIndex: 5,
						}}
					/>
				</Stack>

				<Flex
					justifyContent={'space-between'}
					alignItems={'flex-end'}
					mt={2}
					flex={'0 0 auto'}
					flexWrap='wrap'
					gap={8}
				>
					<Box mt={4} pr={8}>
						<FormControl>
							<Checkbox
								size='sm'
								w='full'
								isRequired
								onChange={() => setOfAge(!ofAge)}
								tabIndex={6}
							>
								I am over 18 years of age.
								<RequiredAsterisk />
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
								<Link as={RouterLink} to={'http://risetheatre.org/terms-conditions'} isExternal>
									Terms and Conditions
								</Link>{' '}
								and{' '}
								<Link as={RouterLink} to={'http://risetheatre.org/privacy-policy'} isExternal>
									Privacy Policy
								</Link>
								.
								<RequiredAsterisk />
							</Checkbox>
						</FormControl>
						<Button
							type='submit'
							colorScheme='orange'
							isDisabled={!formIsValid || submitLoading}
							mt={4}
							tabIndex={8}
							isLoading={!!submitLoading}
						>
							Create account
						</Button>
					</Box>
					{!isLargerThanMd && <BackToLoginButton width='full' justifyContent={'flex-end'} />}
				</Flex>
			</chakra.form>
		</>
	);
}
