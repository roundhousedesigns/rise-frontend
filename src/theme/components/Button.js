import { defineStyleConfig } from '@chakra-ui/react';

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
		toggle: {
			fontWeight: 'normal',
			border: '1px solid',
			bg: 'gray.200',
			borderColor: 'gray.200',
			_hover: {
				bg: 'gray.100',
			},
			_checked: {
				bg: 'cyan.100',
			},
		},
	},
});
