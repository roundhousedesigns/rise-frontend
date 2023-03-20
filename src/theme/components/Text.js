import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	baseStyle: {
		my: 2,
		lineHeight: 'base',
		textUnderlineOffset: '0.2em',
		fontWeight: 'medium',
		color: 'blackAlpha.900',
		_dark: {
			color: 'whiteAlpha.900',
		},
	},
	variants: {
		devAlert: {
			fontWeight: 'bold',
			fontSize: 'sm',
			color: 'brand.red',
		},
	},
});
