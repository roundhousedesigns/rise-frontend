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
};

const sizes = {
	xl: defineStyle({
		fontSize: 'xl',
		p: 4,
	}),
};

export default defineStyleConfig({
	baseStyle,
	variants,
	sizes,
});
