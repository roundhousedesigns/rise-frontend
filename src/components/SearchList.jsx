import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';

export default function SearchList({ items }) {
	return (
		<VStack alignItems="center" justifyContent="center" p={4}>
			{items.map((i, index) => (
				<Box key={index} px={4} py={2} my={2}>
					<Text>{i}</Text>
					<Text as="small">(Parameters)</Text>
				</Box>
			))}
		</VStack>
	);
}
