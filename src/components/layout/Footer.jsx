import React from 'react';
import {
	Box,
	Container,
	Heading,
	IconButton,
	Button,
	useColorMode,
} from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Footer() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box w="full" h="20vh" py={8} background="brand.cyan" alignItems="center">
			<Container w="full" maxW="9xl" centerContent={true}>
				<Heading variant="pageSubtitle">Footer</Heading>

				<Button>I AM A BUTTON!</Button>

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
			</Container>
		</Box>
	);
}
