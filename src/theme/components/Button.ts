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
	headerButton: defineStyle({
		borderRadius: { base: 'full', md: 'lg' },
		size: 'lg',
		px: { base: 0, md: 4 },
		textTransform: 'none',
	}),
	bookmark: defineStyle({
		size: 'xl',
		px: 1,
		cursor: 'pointer',
		_dark: {
			bg: 'blackAlpha.400',
		},
		_light: {
			bg: 'blackAlpha.200',
		},
	}),
	remove: defineStyle({
		bg: 'transparent',
		// boxSize: 12
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
