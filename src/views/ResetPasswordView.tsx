import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
	Button,
	Box,
	Stack,
	Container,
	Heading,
	useToast,
	chakra,
	Icon,
	Tooltip,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiHelpCircle } from 'react-icons/fi';
import TextInput from '@common/inputs/TextInput';
import useResetUserPassword from '@mutations/useResetUserPassword';

interface Props {
	token: string;
	login: string;
}

const validationSchema = Yup.object().shape({
	newPassword: Yup.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'Password must have at least one lowercase letter, one uppercase letter, one number, and one special character'
		)
		.required('New password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('newPassword')], 'Passwords must match')
		.required('Confirm password is required'),
});

export default function ResetPasswordView({ token, login }: Props) {
	const { resetUserPasswordMutation } = useResetUserPassword();

	const toast = useToast();
	const navigate = useNavigate();

	const handleSubmit = async (
		values: { newPassword: string; confirmPassword: string },
		{
			setSubmitting,
			setFieldError,
		}: {
			setSubmitting: (isSubmitting: boolean) => void;
			setFieldError: (field: string, message: string) => void;
		}
	) => {
		if (!token || !login) {
			setFieldError('newPassword', 'Invalid reset token or login');
			setSubmitting(false);
			return;
		}

		try {
			await resetUserPasswordMutation(token, login, values.newPassword);
			toast({
				title: 'Success!',
				description: 'Please login with your new password.',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
			navigate('/login');
		} catch (error: any) {
			setFieldError('newPassword', 'An error occurred. Please try again.');
		}
		setSubmitting(false);
	};

	return (
		<Container bg={'whiteAlpha.500'} borderRadius={'lg'} w={'full'}>
			<Heading as={'h3'} size={'lg'}>
				Choose your new password.
			</Heading>

			<Box mt={2}>
				<Formik
					initialValues={{
						newPassword: '',
						confirmPassword: '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isValid, dirty, isSubmitting, errors, touched }) => (
						<Form>
							<Stack direction={'row'} spacing={6}>
								<Field name='newPassword'>
									{({ field }: any) => (
										<TextInput
											{...field}
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
											error={touched.newPassword && errors.newPassword}
											isRequired
											inputProps={{
												type: 'password',
												autoComplete: 'new-password',
											}}
										/>
									)}
								</Field>
								<Field name='confirmPassword'>
									{({ field }: any) => (
										<TextInput
											{...field}
											variant={'filled'}
											label={'Confirm your password'}
											error={touched.confirmPassword && errors.confirmPassword}
											isRequired
											inputProps={{
												type: 'password',
												autoComplete: 'new-password',
											}}
										/>
									)}
								</Field>
							</Stack>
							<Box mt={4}>
								<Button
									type={'submit'}
									colorScheme={'orange'}
									isDisabled={!isValid || !dirty || isSubmitting}
									isLoading={isSubmitting}
								>
									Reset password
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Box>
		</Container>
	);
}
