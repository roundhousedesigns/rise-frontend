import { defineStyleConfig } from '@chakra-ui/react';

const baseStyle = {
	fontWeight: 'medium',
};

const variants = {
	default: {
		borderRadius: 'lg',
	},
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
	oversized: {
		fontSize: 'xl',
		px: '6',
		py: '4',
		borderRadius: 'lg',
	},
};

const defaultProps = {
	variants: 'default',
};

export default defineStyleConfig({
	baseStyle,
	variants,
	defaultProps,
});
