import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
	fontWeight: 'medium',
	borderRadius: 'lg',
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
	oversized: defineStyle({
		fontSize: 'xl',
		px: '6',
		py: '4',
		borderRadius: 'lg',
	}),
};

export default defineStyleConfig({
	baseStyle,
	variants,
});
