import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Card,
	Button,
	Code,
	FormControl,
	FormLabel,
	Input,
	Flex,
	Container,
	FormErrorMessage,
	Heading,
} from '@chakra-ui/react';

import { AuthContext } from '../context/AuthContext';

import { useLoginWithCookies } from '../hooks/mutations/useLoginWithCookies';
import { useLoginError } from '../hooks/hooks';

export default function LoginView() {
	const { setUserIsLoggedIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		login: '',
		password: '',
	});
	const [errorCode, setErrorCode] = useState('');
	const { loginMutation } = useLoginWithCookies();

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
				if ('SUCCESS' === results.data.loginWithCookies.status) {
					setUserIsLoggedIn(true);
					navigate('/');
				}
			})
			.catch((errors) => setErrorCode(errors.message));
	};

	return (
		<Container>
			<Heading size="lg">Please sign in.</Heading>
			<Code my={4}>
				User: test
				<br />
				Pass: test
			</Code>
			<Card p={4} my={4}>
				<form onSubmit={handleLoginSubmit}>
					<FormControl isInvalid={!!errorMessage}>
						<Input
							name="login"
							id="login"
							type="text"
							variant="filled"
							bg="white"
							isRequired
							onChange={handleInputChange}
						/>
						<FormLabel htmlFor="login">Username or Email</FormLabel>
						<Input
							name="password"
							id="password"
							type="password"
							variant="filled"
							bg="white"
							isRequired
							onChange={handleInputChange}
						/>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Flex gap={6} alignItems="center" mt={6}>
							<Button type="submit" colorScheme="gray">
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
