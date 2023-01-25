import React from 'react';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';

// Dev.
import { simpleWordsArray } from '@/dummydata';

// 	graphql query to get filter terms

export default function SearchFilter({ tempNumItems, heading }) {
	return (
		<Box width="full" my={8}>
			<Heading
				size="md"
				align="center"
				mb={3}
				width="full"
				borderBottom="2px"
				borderColor="gray.600"
			>
				{heading}
			</Heading>
			<Flex
				justifyContent="flex-start"
				alignItems="center"
				width="full"
				flexWrap="wrap"
				gap={4}
				mb={4}
			>
				{simpleWordsArray(tempNumItems ? tempNumItems : 8).map((i) => (
					<Button key={i} fontWeight="medium">
						{i}
					</Button>
				))}
			</Flex>
		</Box>
	);
}
