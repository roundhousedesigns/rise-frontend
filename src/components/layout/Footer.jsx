import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';

export default function Footer() {
	return (
		<Box w="full" h="20vh" py={8} background="brand.pink" alignItems="center">
			<Container w="full" maxW="9xl" centerContent={true}>
				<Heading variant="pageSubtitle">Footer</Heading>
			</Container>
		</Box>
	);
}
