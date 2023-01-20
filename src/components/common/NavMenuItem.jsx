import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export default function NavMenuItem({ linkTo, styles, children }) {
	return (
		<Box {...styles} fontWeight={700} fontSize="lg" letterSpacing={1} mx={2}>
			<Link to={linkTo}>{children}</Link>
		</Box>
	);
}
