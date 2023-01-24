import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const round = defineStyle({
	border: '2px solid',
	borderRadius: 'full',
});

const invisible = defineStyle({
	border: 'none',
	background: 'transparent',
	_hover: {
		background: 'transparent',
	},
	_active: {
		background: 'transparent',
	},
});

export default defineStyleConfig({ variants: { round, invisible } });
