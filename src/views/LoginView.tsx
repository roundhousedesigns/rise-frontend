import { SetStateAction, useContext, useState } from 'react';
import {
	Card,
	Button,
	FormControl,
	FormLabel,
	Input,
	Flex,
	Container,
	FormErrorMessage,
	Heading,
} from '@chakra-ui/react';

import { AuthContext } from '../context/AuthContext';

import { useLogin } from '../hooks/mutations/useLogin';
import { useLoginError } from '../hooks/hooks';

export default function LoginView() {
	const { setLoggedInUser } = useContext(AuthContext);
	// TODO type useState
	const [credentials, setCredentials] = useState({
		login: '',
		password: '',
	});
	// TODO type useState
	const [errorCode, setErrorCode] = useState('');
	const { loginMutation } = useLogin();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const errorMessage = useLoginError(errorCode);

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		loginMutation(credentials)
			.then((results) => {
				if ('SUCCESS' === results.data.login.status) {
					setLoggedInUser(results.data.login);
				}
			})
			.catch((errors: { message: SetStateAction<string> }) => setErrorCode(errors.message));
	};

	return (
		<Container>
			<Heading size='lg'>Please sign in.</Heading>
			<Card p={4} my={4}>
				<form onSubmit={handleLoginSubmit}>
					<FormControl isInvalid={!!errorMessage}>
						<Input
							name='login'
							id='login'
							type='text'
							variant='filled'
							bg='white'
							isRequired
							onChange={handleInputChange}
						/>
						<FormLabel htmlFor='login'>Username or Email</FormLabel>
						<Input
							name='password'
							id='password'
							type='password'
							variant='filled'
							bg='white'
							isRequired
							onChange={handleInputChange}
						/>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Flex gap={6} alignItems='center' mt={6}>
							<Button type='submit' colorScheme='blue'>
								Submit
							</Button>
							<FormErrorMessage mt={0}>{errorMessage}</FormErrorMessage>
						</Flex>
					</FormControl>
				</form>
			</Card>
		</Container>
	);
}
