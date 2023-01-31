import React from 'react';
import { Box, Heading, Wrap, Button, Select } from '@chakra-ui/react';

import { simpleWordsArray } from '../../lib/_devData';

interface Props {
	heading: string;
	_devNumItems?: number;
	_devReturnElement?: string;
}

export default function SearchFilter({
	heading,
	_devNumItems,
	_devReturnElement,
}: Props) {
	const _devDummyData = simpleWordsArray(_devNumItems ? _devNumItems : 8);

	return (
		<Box width="full" my={8}>
			<Heading
				size="md"
				mb={3}
				width="full"
				borderBottom="2px"
				borderColor="gray.600"
			>
				{heading}
			</Heading>
			<Wrap
				justifyContent="flex-start"
				alignItems="center"
				width="full"
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
								cursor="pointer"
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
			</Wrap>
		</Box>
	);
}
