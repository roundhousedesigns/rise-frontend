import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
	fontWeight: 'medium',
	borderRadius: 'md',
	textDecoration: 'none',
	_hover: {
		textDecoration: 'none',
	},
});

const variants = {
	invisible: defineStyle({
		border: 'none',
		background: 'transparent',
		_hover: {
			background: 'transparent',
		},
		_active: {
			background: 'transparent',
		},
	}),
	inlineIcon: defineStyle({
		cursor: 'default !important',
		alignItems: 'center',
		borderRadius: 'full',
		pointerEvents: 'none',
		opacity: '1 !important',
	}),
	searchFilter: defineStyle({
		_dark: {
			bg: 'gray.800',
			_checked: {
				bg: 'gray.300',
			},
			_hover: {
				bg: 'gray.600',
			},
		},
		_light: {
			bg: 'gray.100',
			_checked: {
				bg: 'gray.600',
			},
			_hover: {
				bg: 'gray.50',
			},
		},
	}),
};

const sizes = {
	xl: defineStyle({
		fontSize: 'xl',
		p: 4,
	}),
	xxl: defineStyle({
		fontSize: '2xl',
		p: 4,
	}),
	xxxl: defineStyle({
		fontSize: '3xl',
		p: 4,
	}),
};

export default defineStyleConfig({
	baseStyle,
	variants,
	sizes,
});
