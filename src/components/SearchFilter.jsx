import React from 'react';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';

import { simpleWordsArray } from '@/dummydata';

export default function SearchFilter({ tempNumItems, heading }) {
	return (
		<Box width="full" my={8}>
			<Heading size="lg" align="center">
				{heading}
			</Heading>
			<Flex
				justifyContent="center"
				alignItems="flex-start"
				width="full"
				flexWrap="wrap"
				gap={4}
				mb={4}
				px={4}
			>
				{simpleWordsArray(tempNumItems ? tempNumItems : 8).map((i) => (
					<Button key={i}>{i}</Button>
				))}
			</Flex>
		</Box>
	);
}
