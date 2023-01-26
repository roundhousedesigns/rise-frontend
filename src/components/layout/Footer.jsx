import React from 'react';
import { Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Footer() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex
			w="full"
			h="20vh"
			py={8}
			background="brand.cyan"
			alignItems="center"
			justifyContent="center"
		>
			<Heading variant="pageSubtitle">Footer</Heading>

			<IconButton
				aria-label="Toggle dark mode"
				variant="round"
				icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
				size="lg"
				pos="absolute"
				colorScheme="blackAlpha"
				color="whiteAlpha.900"
				right={0}
				bottom={0}
				m={2}
				onClick={toggleColorMode}
			/>
		</Flex>
	);
}
