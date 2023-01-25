import React from 'react';
import { Box, Heading, Flex, Button, Select } from '@chakra-ui/react';

// TODO Replace with real data

// Dev.
import { simpleWordsArray } from '@/dummydata';

export default function SearchFilter({
	heading,
	_devNumItems,
	_devReturnElement,
}) {
	const _devDummyData = simpleWordsArray(_devNumItems ? _devNumItems : 8);

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
				{_devReturnElement === 'select'
					? _devDummyData.map((item, index) => (
							<Select
								key={index}
								variant="outline"
								placeholder="Choose an option"
								flex={1}
							>
								{[...Array(3)].map((_, index) => (
									<option key={index} value="something">
										{item}
									</option>
								))}
							</Select>
					  ))
					: _devReturnElement === 'button'
					? _devDummyData.map((item, index) => (
							<Button key={index} variant="toggle">
								{item}
							</Button>
					  ))
					: null}
			</Flex>
		</Box>
	);
}
