import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	baseStyle: {
		borderRadius: 'sm',
	},
	variants: {
		round: {
			border: '1px solid',
			borderRadius: 'full',
		},
		invisible: {
			border: 'none',
			background: 'transparent',
			_hover: {
				background: 'transparent',
			},
			_active: {
				background: 'transparent',
			},
		},
	},
});
