import React from 'react';
import { Avatar, Text, Stack } from '@chakra-ui/react';

// A candidate with image, name, and some data.

export default function Candidate({ item }) {
	return (
		<Stack
			direction="row"
			justifyContent="flex-start"
			alignItems="baseline"
			flexWrap={{ base: 'wrap', md: 'nowrap' }}
			gap={{ base: 'initial', md: 0 }}
		>
			<Avatar size="sm" name={item} flex="0 0 auto" mr={2} />
			<Text
				fontSize="md"
				fontWeight="normal"
				textAlign="left"
				flex="1"
				mb={{ base: 1, lg: 0 }}
			>
				{item}
			</Text>
			<Text
				fontSize="sm"
				textAlign="right"
				ml={{ base: '0 !important', lg: 'initial' }}
				flex="1"
			>
				Department &bull; Job &bull; Something else
			</Text>
		</Stack>
	);
}
