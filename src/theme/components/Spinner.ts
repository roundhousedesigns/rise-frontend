import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	variants: {
		bold: {
			borderWidth: 4,
			color: 'blue.500',
			emptyColor: 'green.400',
		},
	},
	defaultProps: {
		size: 'xl',
		variant: 'bold',
		speed: '0.65s'
	},
});
