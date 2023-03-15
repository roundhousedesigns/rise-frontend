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
		},
		pageSubtitle: {
			fontSize: '3xl',
		},
		contentTitle: {
			fontSize: '2xl',
			fontWeight: 'bold',
			mb: 0,
			pb: 0,
		},
		contentSubtitle: {
			fontSize: 'md',
			fontWeight: 'medium',
			mt: 0,
			mb: 2,
			pb: 0,
		},
	},
});
