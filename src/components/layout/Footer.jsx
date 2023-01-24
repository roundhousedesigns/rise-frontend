import React from 'react';
import {
	Box,
	Container,
	Heading,
	IconButton,
	useColorMode,
} from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Footer() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box w="full" h="20vh" py={8} background="brand.pink" alignItems="center">
			<Container w="full" maxW="9xl" centerContent={true}>
				<Heading variant="pageSubtitle">Footer</Heading>
				<IconButton
					aria-label="Toggle dark mode"
					variant="invisible"
					icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
					size="lg"
					pos="absolute"
					right={0}
					bottom={0}
					m={2}
					onClick={toggleColorMode}
				/>
			</Container>
		</Box>
	);
}
