import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	cardAnatomy.keys
);

const baseStyle = definePartsStyle({
	container: {
		py: 0,
		px: 6,
	},
	header: {
		mb: 0,
		py: 0,
		fontSize: '2xl',
		fontWeight: 'bold',
	},
	body: {
		pb: 0,
	},
});

export default defineMultiStyleConfig({ baseStyle });
