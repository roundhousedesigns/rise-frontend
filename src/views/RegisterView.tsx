import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
	chakra,
	Button,
	Box,
	Stack,
	Spinner,
	Checkbox,
	Link,
	Divider,
	Heading,
	useToast,
	Flex,
	useMediaQuery,
	Tooltip,
	Icon,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { FiHelpCircle } from 'react-icons/fi';
import { handleReCaptchaVerify } from '@lib/utils';
import TextInput from '@common/inputs/TextInput';
import useRegisterUser from '@mutations/useRegisterUser';
import { RegisterUserInput } from '@lib/types';
import usePostContent from '@queries/usePostContent';
import BackToLoginButton from '@common/BackToLoginButton';
import RequiredAsterisk from '@common/RequiredAsterisk';

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Password must have at least one lowercase letter, one uppercase letter, one number, and one special character'
		)
		.required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Confirm password is required'),
	ofAge: Yup.boolean().oneOf([true], 'You must be over 18 years of age'),
	termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

export default function RegisterView() {
	const [content, { contentLoading, contentError }] = usePostContent('576');

	const { executeRecaptcha } = useGoogleReCaptcha();

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const {
		registerUserMutation,
		results: { loading: submitLoading },
	} = useRegisterUser();

	const navigate = useNavigate();
	const toast = useToast();

	const handleSubmit = async (
		values: RegisterUserInput & { ofAge: boolean; termsAccepted: boolean },
		{
			setSubmitting,
			setFieldError,
		}: FormikHelpers<RegisterUserInput & { ofAge: boolean; termsAccepted: boolean }>
	) => {
		const token = await handleReCaptchaVerify({ label: 'registerUser', executeRecaptcha });
		if (!token) {
			setFieldError('email', 'ReCAPTCHA verification failed. Please try again.');
			setSubmitting(false);
			return;
		}

		try {
			await registerUserMutation({ ...values, reCaptchaToken: token });
			toast({
				title: 'Account created!',
				description: 'Please check your inbox for confirmation.',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
			navigate('/login');
		} catch (error: any) {
			if (error.message === 'email_exists') {
				setFieldError('email', 'This email is already registered');
			} else {
				setFieldError('email', 'An error occurred. Please try again.');
			}
		}
		setSubmitting(false);
	};

	return (
		<>
			{contentLoading ? (
				<Spinner />
			) : contentError ? (
				'Error loading content'
			) : content ? (
				<Box my={4}>{content}</Box>
			) : null}

			<Divider my={6} />

			<Heading as={'h2'} variant={'contentTitle'}>
				Create an account
			</Heading>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					password: '',
					confirmPassword: '',
					ofAge: false,
					termsAccepted: false,
					reCaptchaToken: '',
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isValid, dirty, isSubmitting, errors, touched }) => (
					<Form>
						<Stack direction={'row'} spacing={6}>
							<Field name='firstName'>
								{({ field }: any) => (
									<TextInput
										{...field}
										isRequired
										flex={'1'}
										label={'First name'}
										error={touched.firstName && errors.firstName}
										inputProps={{
											size: 'xl',
											autoComplete: 'given-name',
											tabIndex: 1,
										}}
									/>
								)}
							</Field>
							<Field name='lastName'>
								{({ field }: any) => (
									<TextInput
										{...field}
										isRequired
										flex={'1'}
										label={'Last name'}
										error={touched.lastName && errors.lastName}
										inputProps={{
											size: 'xl',
											autoComplete: 'family-name',
											tabIndex: 2,
										}}
									/>
								)}
							</Field>
						</Stack>
						<Field name='email'>
							{({ field }: any) => (
								<TextInput
									{...field}
									type={'email'}
									variant={'filled'}
									label={'Email address'}
									error={touched.email && errors.email}
									isRequired
									inputProps={{
										size: 'xl',
										autoComplete: 'email',
										tabIndex: 3,
									}}
								/>
							)}
						</Field>
						<Stack direction={'row'} spacing={6} flexWrap={'wrap'}>
							<Field name='password'>
								{({ field }: any) => (
									<TextInput
										{...field}
										type={'password'}
										variant={'filled'}
										label={
											<>
												Password{' '}
												<Tooltip
													hasArrow
													label={
														'Passwords must have at least one lowercase letter, one uppercase letter, one number, and one special character.'
													}
												>
													<chakra.span>
														<Icon as={FiHelpCircle} />
													</chakra.span>
												</Tooltip>
											</>
										}
										flex={1}
										isRequired
										error={touched.password && errors.password}
										inputProps={{
											size: 'xl',
											type: 'password',
											autoComplete: 'new-password',
											tabIndex: 4,
										}}
									/>
								)}
							</Field>
							<Field name='confirmPassword'>
								{({ field }: any) => (
									<TextInput
										{...field}
										type={'password'}
										variant={'filled'}
										label={'Confirm your password'}
										flex={1}
										isRequired
										error={touched.confirmPassword && errors.confirmPassword}
										inputProps={{
											size: 'xl',
											type: 'password',
											autoComplete: 'new-password',
											tabIndex: 5,
										}}
									/>
								)}
							</Field>
						</Stack>

						<Flex
							justifyContent={'space-between'}
							alignItems={'flex-end'}
							mt={2}
							flex={'0 0 auto'}
							flexWrap={'wrap'}
							gap={8}
						>
							<Box mt={4} pr={8}>
								<Field name='ofAge'>
									{({ field }: any) => (
										<Checkbox {...field} size={'sm'} w={'full'} isRequired tabIndex={6}>
											I am over 18 years of age.
											<RequiredAsterisk />
										</Checkbox>
									)}
								</Field>
								<Field name='termsAccepted'>
									{({ field }: any) => (
										<Checkbox {...field} size={'sm'} w={'full'} isRequired tabIndex={7}>
											I have read and accept the RISE Theatre Directory{' '}
											<Link
												as={RouterLink}
												to={'http://risetheatre.org/terms-conditions'}
												isExternal
											>
												Terms and Conditions
											</Link>{' '}
											and{' '}
											<Link as={RouterLink} to={'http://risetheatre.org/privacy-policy'} isExternal>
												Privacy Policy
											</Link>
											.
											<RequiredAsterisk />
										</Checkbox>
									)}
								</Field>
								<Button
									type={'submit'}
									colorScheme={'orange'}
									isDisabled={!isValid || !dirty || isSubmitting}
									mt={4}
									tabIndex={8}
									isLoading={isSubmitting}
								>
									Create account
								</Button>
							</Box>
							{!isLargerThanMd && <BackToLoginButton width={'full'} justifyContent={'flex-end'} />}
						</Flex>
					</Form>
				)}
			</Formik>
		</>
	);
}
