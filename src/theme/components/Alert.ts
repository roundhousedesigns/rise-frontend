import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	alertAnatomy.keys
);

const baseStyle = definePartsStyle({
	container: {
		borderRadius: 'md',
		fontSize: 'sm',
		my: 4
	},
});

export default defineMultiStyleConfig({ baseStyle });
