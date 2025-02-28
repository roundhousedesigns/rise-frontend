'use client';

import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useAuth } from '../providers/AuthProvider';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Link from 'next/link';

export default function Dashboard() {
	const { logout } = useAuth();

	return (
		<ProtectedRoute>
			<Box p={8}>
				<Heading mb={4}>Dashboard</Heading>
				<Text mb={4}>This is a protected page that requires authentication.</Text>
				
				<Box display="flex" gap={4} mt={8}>
					<Button as={Link} href="/" colorScheme="blue">
						Home
					</Button>
					<Button onClick={logout} colorScheme="red">
						Logout
					</Button>
				</Box>
			</Box>
		</ProtectedRoute>
	);
} 