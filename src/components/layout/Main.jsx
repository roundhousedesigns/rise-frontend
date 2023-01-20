import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

export default function Main() {
	return (
		<Box
			w="full"
			h="fill"
			background="none"
			align="center"
			justifyContent="center"
			p={8}
		>
			<Heading as="h2" textAlign="left">
				Welcome, Name!
			</Heading>
		</Box>
	);
}
