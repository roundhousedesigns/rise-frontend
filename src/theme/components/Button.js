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
		toggle: {
			fontWeight: 'normal',
			border: '1px solid',
			colorScheme: 'gray',
			_hover: {
				bg: 'gray.100',
			},
			_checked: {
				bg: 'cyan.100',
			},
		},
	},
});
