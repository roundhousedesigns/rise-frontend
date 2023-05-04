import { useState } from 'react';
import { Button, Text, Flex, Container, Heading, Box, Spinner, useToast } from '@chakra-ui/react';

import TextInput from '../components/common/inputs/TextInput';
import { useSendPasswordResetEmail } from '../hooks/mutations/useSendPasswordResetEmail';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
	const [username, setUsername] = useState<string>('');
	const {
		sendPasswordResetEmailMutation,
		results: { loading: submitLoading },
	} = useSendPasswordResetEmail();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const toast = useToast();
	const navigate = useNavigate();

	// const errorMessage = useLoginError(errorCode);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// TODO handle password reset errors
		sendPasswordResetEmailMutation(username)
			.then(() => {
				toast({
					title: 'Email sent',
					description: 'Please check your inbox for reset instructions.',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'top',
				});
			})
			.then(() => {
				navigate('/');
			});
	};

	return (
		<Container>
			<Heading size='lg'>Lost password</Heading>
			<Text fontSize='sm'>
				Please enter your email address, and we'll send you a link to reset your password.
			</Text>
			<Box my={4}>
				<form onSubmit={handleSubmit}>
					<TextInput
						value={username}
						name='username'
						label='Email'
						autoComplete='username'
						isRequired
						onChange={handleInputChange}
						inputProps={{
							autoComplete: 'username',
						}}
					/>
					<Flex justifyContent='flex-start' gap={4}>
						<Button type='submit' colorScheme='blue' px={6}>
							{submitLoading ? <Spinner size='sm' /> : 'Submit'}
						</Button>
					</Flex>
				</form>
			</Box>
		</Container>
	);
}
