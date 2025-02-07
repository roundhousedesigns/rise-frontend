import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Button, Text, Flex, Container, Heading, Box, useToast, chakra } from '@chakra-ui/react';

import TextInput from '@common/inputs/TextInput';
import useSendPasswordResetEmail from '@mutations/useSendPasswordResetEmail';
import { useErrorMessage } from '@hooks/hooks';
import { handleReCaptchaVerify } from '@lib/utils';

export default function LoginView() {
	const [username, setUsername] = useState<string>('');
	const [errorCode, setErrorCode] = useState<string>('');
	const { executeRecaptcha } = useGoogleReCaptcha();

	const {
		sendPasswordResetEmailMutation,
		results: { loading: submitLoading },
	} = useSendPasswordResetEmail();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const toast = useToast();
	const navigate = useNavigate();

	const errorMessage = useErrorMessage(errorCode);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		handleReCaptchaVerify({ label: 'resetPassword', executeRecaptcha }).then((token) => {
			if (!token) {
				setErrorCode('recaptcha_error');
				return;
			}

			sendPasswordResetEmailMutation({ username, reCaptchaToken: token })
				.then(() => {
					toast({
						title: 'Email sent',
						description: 'Please check your inbox for reset instructions.',
						status: 'success',
						duration: 3000,
						isClosable: true,
						position: 'bottom',
					});
				})
				.then(() => {
					navigate('/');
				})
				.catch((err) => {
					setErrorCode(err.message);
				});
		});
	};

	return (
		<Container maxW='2xl' mt={6}>
			<Heading as='h2' size='xl' mb={4}>
				Lost password
			</Heading>
			<Text fontSize='md'>
				Please enter your email address, and we'll send you a link to reset your password.
			</Text>
			<Box my={4}>
				<chakra.form onSubmit={handleSubmit}>
					<Flex gap={2}>
						<TextInput
							value={username}
							name='username'
							label='Email'
							isRequired
							onChange={handleInputChange}
							inputProps={{
								autoComplete: 'username',
							}}
							error={errorMessage}
						/>
						<Button type='submit' colorScheme='blue' px={6} isLoading={!!submitLoading}>
							Submit
						</Button>
					</Flex>
				</chakra.form>
			</Box>
		</Container>
	);
}
