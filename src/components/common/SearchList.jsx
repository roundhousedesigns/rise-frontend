import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';

export default function SearchList({ items }) {
	return (
		<VStack alignItems="center" justifyContent="center">
			{items.map((i, index) => (
				<Box key={index}>
					<Text>{i}</Text>
					<Text as="small">(Parameters)</Text>
				</Box>
			))}
		</VStack>
	);
}
