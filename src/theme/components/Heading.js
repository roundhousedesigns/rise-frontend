import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	baseStyle: {
		fontWeight: 'bold',
		color: 'blackAlpha.900',
	},
	variants: {
		pageTitle: {
			fontSize: '5xl',
			mt: 4,
			mb: 10,
		},
		pageSubtitle: {
			fontSize: '3xl',
		},
	},
});
