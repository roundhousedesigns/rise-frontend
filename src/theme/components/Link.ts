import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
	my: 2,
	color: 'brand.blue',
	textDecoration: 'underline',
	transition: 'all 100ms ease-out',
	textDecorationColor: 'transparent',
	_focus: {
		outline: 'none',
	},
	_hover: {
		textDecorationColor: 'initial',
	},
});

const variants = {
	nav: defineStyle({
		textDecoration: 'none',
		_hover: {
			textDecoration: 'none',
		},
	}),
	dotted: defineStyle({
		textDecoration: 'underline',
		textDecorationStyle: 'dotted',
		textDecorationThickness: '1px',
		lineHeight: 'tall',
		_hover: {
			textDecorationStyle: 'solid',
		},
	}),
	button: defineStyle({
		textDecoration: 'none',
		_hover: {
			textDecoration: 'none',
		},
	}),
};

export default defineStyleConfig({
	baseStyle,
	variants,
});
