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

const variants = {
	devMessage: defineStyle({
		color: 'brand.orange',
		_light: {
			color: 'brand.orange',
		},
		_dark: {
			color: 'brand.orange',
		},
		fontSize: 'md',
		fontWeight: 'bold',
		textTransform: 'uppercase',
	}),
};

export default defineStyleConfig({
	baseStyle,
	variants,
});
