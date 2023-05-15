import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	baseStyle: {
		my: 2,
		lineHeight: 'tall',
		textUnderlineOffset: '0.2em',
		fontWeight: 'medium',
		color: 'text.dark',
		_dark: {
			color: 'text.light',
		},
	},
});
