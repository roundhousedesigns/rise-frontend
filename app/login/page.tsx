'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Link as ChakraLink,
} from '@chakra-ui/react';
import { useAuth } from '../providers/AuthProvider';
import Link from 'next/link';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { login } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			// For demo purposes, we'll just simulate a login
			// In a real app, you would call your API here
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Simulate successful login
			login('user-123');
			router.push('/dashboard');
		} catch (err) {
			setError('Invalid email or password');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container maxW="md" py={12}>
			<Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
				<Stack spacing={4}>
					<Heading as="h1" size="lg" textAlign="center">
						Login
					</Heading>
					
					{error && (
						<Text color="red.500" textAlign="center">
							{error}
						</Text>
					)}
					
					<form onSubmit={handleSubmit}>
						<Stack spacing={4}>
							<FormControl id="email">
								<FormLabel>Email</FormLabel>
								<Input 
									type="email" 
									value={email} 
									onChange={(e) => setEmail(e.target.value)} 
									required 
								/>
							</FormControl>
							
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input 
									type="password" 
									value={password} 
									onChange={(e) => setPassword(e.target.value)} 
									required 
								/>
							</FormControl>
							
							<Button 
								type="submit" 
								colorScheme="blue" 
								size="lg" 
								fontSize="md" 
								isLoading={isLoading}
							>
								Sign in
							</Button>
						</Stack>
					</form>
					
					<Stack pt={6}>
						<Text align="center">
							Don't have an account?{' '}
							<ChakraLink as={Link} href="/register" color="blue.400">
								Register
							</ChakraLink>
						</Text>
						<Text align="center">
							<ChakraLink as={Link} href="/lost-password" color="blue.400">
								Forgot password?
							</ChakraLink>
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Container>
	);
} 