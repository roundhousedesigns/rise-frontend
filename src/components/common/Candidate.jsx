import React from 'react';
import { Card, Heading, Stack, Text } from '@chakra-ui/react';

// A candidate with image, name, and some data.

export default function Candidate({ item }) {
	return (
		<Card py={3} textAlign="left">
			<Stack
				direction="row"
				justifyContent="space-between"
				flexWrap={{ base: 'wrap', md: 'nowrap' }}
				gap={{ base: 'initial', md: 0 }}
			>
				<Heading size="sm" fontWeight="normal" mb={{ base: 1, lg: 0 }}>
					{item}
				</Heading>
				<Text fontSize="sm" ml={{ base: '0', lg: 'initial' }}>
					Department &bull; Job &bull; Something else
				</Text>
			</Stack>
		</Card>
	);
}
