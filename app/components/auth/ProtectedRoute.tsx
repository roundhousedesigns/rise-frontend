'use client';

import { ReactNode } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Box, Container, Spinner, Text } from '@chakra-ui/react';

interface ProtectedRouteProps {
	children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isLoggedIn } = useAuth();
	const router = useRouter();

	// If not logged in, show a loading spinner
	// The AuthProvider will handle the redirect to login
	if (!isLoggedIn) {
		return (
			<Container centerContent p={8}>
				<Box textAlign="center" py={10} px={6}>
					<Spinner size="xl" mb={4} />
					<Text>Checking authentication...</Text>
				</Box>
			</Container>
		);
	}

	// If logged in, render the children
	return <>{children}</>;
} 