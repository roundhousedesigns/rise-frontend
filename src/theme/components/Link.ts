import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	variants: {
		default: {
			my: 2,
			textUnderlineOffset: '0.2em',
			color: 'brand.blue',
		},
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
	defaultProps: {
		variant: 'default',
	},
});
