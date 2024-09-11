import { useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button, Text, Flex, Container, Heading, Box, useToast } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import TextInput from '@common/inputs/TextInput';
import useSendPasswordResetEmail from '@mutations/useSendPasswordResetEmail';
import { handleReCaptchaVerify } from '@lib/utils';

const validationSchema = Yup.object().shape({
	username: Yup.string().email('Invalid email').required('Email is required'),
});

export default function LostPasswordView() {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const {
		sendPasswordResetEmailMutation,
		results: { loading: submitLoading },
	} = useSendPasswordResetEmail();

	const toast = useToast();
	const navigate = useNavigate();

	const handleSubmit = async (
		values: { username: string },
		{
			setSubmitting,
			setFieldError,
		}: {
			setSubmitting: (isSubmitting: boolean) => void;
			setFieldError: (field: string, message: string) => void;
		}
	) => {
		const token = await handleReCaptchaVerify({ label: 'resetPassword', executeRecaptcha });
		if (!token) {
			setFieldError('username', 'ReCAPTCHA verification failed. Please try again.');
			setSubmitting(false);
			return;
		}

		try {
			await sendPasswordResetEmailMutation({ username: values.username, reCaptchaToken: token });
			toast({
				title: 'Email sent',
				description: 'Please check your inbox for reset instructions.',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
			navigate('/');
		} catch (error: any) {
			setFieldError('username', 'An error occurred. Please try again.');
		}
		setSubmitting(false);
	};

	return (
		<Container maxW={'2xl'} mt={6}>
			<Heading as={'h2'} size={'xl'} mb={4}>
				Lost password
			</Heading>
			<Text fontSize={'md'}>
				Please enter your email address, and we'll send you a link to reset your password.
			</Text>
			<Box my={4}>
				<Formik
					initialValues={{
						username: '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isValid, dirty, isSubmitting, errors, touched }) => (
						<Form>
							<Flex gap={2}>
								<Field name='username'>
									{({ field }: any) => (
										<TextInput
											{...field}
											label={'Email'}
											my={0}
											isRequired
											error={touched.username && errors.username}
											inputProps={{
												autoComplete: 'username',
											}}
										/>
									)}
								</Field>
								<Button
									type={'submit'}
									colorScheme={'blue'}
									isLoading={isSubmitting}
									isDisabled={!isValid || !dirty || isSubmitting}
								>
									Submit
								</Button>
							</Flex>
						</Form>
					)}
				</Formik>
			</Box>
		</Container>
	);
}
