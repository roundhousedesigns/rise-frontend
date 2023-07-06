import { defineStyleConfig, defineStyle } from '@chakra-ui/react';

const baseStyle = defineStyle({
	my: 2,
	lineHeight: 'tall',
	textUnderlineOffset: '0.2em',
	fontWeight: 'medium',
	color: 'text.dark',
	_dark: {
		color: 'text.light',
	},
});

export default defineStyleConfig({
	baseStyle,
});
