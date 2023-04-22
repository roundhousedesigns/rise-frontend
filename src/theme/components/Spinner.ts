import { defineStyleConfig } from '@chakra-ui/react';

const baseStyle = {
	size: 'xl',
	variant: 'bold',
};

const variants = {
	bold: {
		borderWidth: 4,
		color: 'blue.500',
		emptyColor: 'green.400',
	},
};

export default defineStyleConfig({
	baseStyle,
	variants,
});
