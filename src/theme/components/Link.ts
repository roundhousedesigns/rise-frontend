import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	baseStyle: {
		my: 2,
		textUnderlineOffset: '0.2em',
		colorScheme: 'brand.green',
	},
	variants: {
		nav: {
			textDecoration: 'none',
			_hover: {
				textDecoration: 'none',
			},
		},
		dotted: {
			textDecoration: 'underline',
			textDecorationStyle: 'dotted',
			textDecorationThickness: '1px',
			lineHeight: 'tall',
			_hover: {
				textDecorationStyle: 'solid',
			},
		},
		footer: {
			color: 'inherit',
			textDecoration: 'underline',
		},
	},
});
