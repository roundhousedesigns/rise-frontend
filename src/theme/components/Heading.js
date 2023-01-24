import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	baseStyle: {
		fontWeight: 'bold',
		color: 'blackAlpha.900',
		textAlign: 'left',
		_dark: {
			color: 'whiteAlpha.900',
		},
	},
	variants: {
		pageTitle: {
			fontSize: '4xl',
			mb: 8,
			textAlign: 'left',
		},
		pageSubtitle: {
			fontSize: '3xl',
		},
	},
});
