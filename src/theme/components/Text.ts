import { defineStyleConfig, defineStyle } from '@chakra-ui/react';

const baseStyle = defineStyle({
	my: 2,
	lineHeight: 'tall',
	textUnderlineOffset: '0.2em',
	fontWeight: 'medium',
});

const variants = {
	notice: defineStyle({
		lineHeight: 'normal',
		_dark: {
			color: 'brand.yellow',
		},
		_light: {
			color: 'brand.blue',
		},
	}),
	helperText: defineStyle({
		lineHeight: 'normal',
		fontSize: 'xs',
		letterSpacing: '0.8px',
		opacity: 0.8,
		_dark: {
			color: 'text.light',
		},
		_light: {
			color: 'text.dark',
		},
	}),
	formError: defineStyle({
		fontWeight: 'bold',
		fontStyle: 'italic',
		mt: 0,
		flex: '1',
		fontSize: 'xs',
		color: 'brand.red',
	}),
};

export default defineStyleConfig({
	baseStyle,
	variants,
});
