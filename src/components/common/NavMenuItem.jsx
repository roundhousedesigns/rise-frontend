import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export default function NavMenuItem({ linkTo, children }) {
	return (
		<Box color="whiteAlpha.900" fontWeight="bold" fontSize="md" px={8}>
			<Link as={RouterLink} to={linkTo}>
				{children}
			</Link>
		</Box>
	);
}
