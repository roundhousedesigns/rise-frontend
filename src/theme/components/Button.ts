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
	inline: defineStyle({
		cursor: 'default',
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'full',
		mx: 1,
		bg: 'blackAlpha.300',
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
