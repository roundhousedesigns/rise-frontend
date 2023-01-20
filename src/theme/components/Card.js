import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
	container: {
		bg: 'blackAlpha.50',
		py: 0,
		px: 6,
		_dark: {
			bg: 'whiteAlpha.50',
		},
	},
	header: {
		mb: 0,
		py: 0,
		fontSize: '2xl',
		fontWeight: 'bold',
		color: 'blackAlpha.900',
		_dark: {
			color: 'whiteAlpha.900',
		},
	},
	body: {
		color: 'blackAlpha.800',
		pb: 0,
		_dark: {
			color: 'whiteAlpha.800',
		},
	},
});

export default defineMultiStyleConfig({ baseStyle });
