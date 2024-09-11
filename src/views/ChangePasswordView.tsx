import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { chakra, Button, Text, Box, Flex, ListItem, List, Card } from '@chakra-ui/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { handleReCaptchaVerify } from '@lib/utils';
import useViewer from '@queries/useViewer';
import useChangeUserPassword from '@mutations/useChangeUserPassword';
import useLogout from '@mutations/useLogout';
import TextInput from '@common/inputs/TextInput';

const validationSchema = Yup.object().shape({
	currentPassword: Yup.string().required('Current password is required'),
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

export default function ChangePasswordView() {
	const [{ email: username }] = useViewer();
	const { executeRecaptcha } = useGoogleReCaptcha();

	const { changeUserPasswordMutation } = useChangeUserPassword();
	const { logoutMutation } = useLogout();

	const handleSubmit = async (
		values: { currentPassword: string; newPassword: string; confirmPassword: string },
		{
			setSubmitting,
			setFieldError,
		}: {
			setSubmitting: (isSubmitting: boolean) => void;
			setFieldError: (field: string, message: string) => void;
		}
	) => {
		const token = await handleReCaptchaVerify({ label: 'changePassword', executeRecaptcha });
		if (!token) {
			setFieldError('currentPassword', 'ReCAPTCHA verification failed. Please try again.');
			setSubmitting(false);
			return;
		}

		try {
			await changeUserPasswordMutation(username, values.currentPassword, values.newPassword);
			await logoutMutation();
			window.location.href =
				'/login?alert=Success! Please log in with your new password.&alertStatus=success';
		} catch (error: any) {
			if (error.message === 'incorrect_password') {
				setFieldError('currentPassword', 'Incorrect current password');
			} else {
				setFieldError('currentPassword', 'An error occurred. Please try again.');
			}
		}
		setSubmitting(false);
	};

	return (
		<Formik
			initialValues={{
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			}}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ isValid, dirty, isSubmitting, errors, touched }) => (
				<Form>
					<chakra.div mt={3} w={'full'}>
						<Box my={4}>
							<Field name='currentPassword'>
								{({ field }: any) => (
									<TextInput
										{...field}
										name={'currentPassword'}
										id={'currentPassword'}
										variant={'filled'}
										label={'Current password'}
										isRequired
										error={touched.currentPassword && errors.currentPassword}
										inputProps={{
											type: 'password',
											autoComplete: 'current-password',
										}}
									/>
								)}
							</Field>
						</Box>
						<Card _dark={{ bgColor: 'gray.800' }} my={8} gap={6}>
							<Flex
								alignItems={'center'}
								mx={'auto'}
								gap={6}
								lineHeight={'normal'}
								fontSize={'xs'}
								pt={1}
							>
								<Text m={0} fontStyle={'italic'}>
									Passwords must have at least:
								</Text>
								<List listStyleType={'disc'}>
									<ListItem>one lowercase letter</ListItem>
									<ListItem>one uppercase letter</ListItem>
									<ListItem>one number</ListItem>
									<ListItem>one special character</ListItem>
								</List>
							</Flex>
							<Flex gap={6} flexWrap={'wrap'}>
								<Field name='newPassword'>
									{({ field }: any) => (
										<TextInput
											{...field}
											name={'newPassword'}
											id={'newPassword'}
											variant={'filled'}
											label={'New password'}
											isRequired
											error={touched.newPassword && errors.newPassword}
											flex={'1'}
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
											name={'confirmPassword'}
											id={'confirmPassword'}
											type={'password'}
											variant={'filled'}
											label={'Confirm your new password'}
											isRequired
											error={touched.confirmPassword && errors.confirmPassword}
											flex={{ base: 'auto', md: '1' }}
											inputProps={{
												type: 'password',
												autoComplete: 'new-password',
											}}
										/>
									)}
								</Field>
							</Flex>
						</Card>
						<Box mt={4}>
							<Button
								type={'submit'}
								colorScheme={'orange'}
								isDisabled={!isValid || !dirty || isSubmitting}
								isLoading={isSubmitting}
							>
								Change password
							</Button>
						</Box>
					</chakra.div>
				</Form>
			)}
		</Formik>
	);
}
