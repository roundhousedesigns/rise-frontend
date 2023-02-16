import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	baseStyle: {
		borderRadius: 'sm',
	},
	variants: {
		round: {
			borderRadius: 'full',
		},
		socialRound: {
			borderRadius: 'full',
			border: 'none',
			bg: 'blackAlpha.700',
			color: 'white',
			_hover: {
				bg: 'blackAlpha.600',
			},
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
