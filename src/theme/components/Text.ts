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
	postExcerpt: defineStyle({
		fontSize: 'md',
		lineHeight: 'normal',
		m: 0,
	}),
};

export default defineStyleConfig({
	baseStyle,
	variants,
});
