import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
	button: {
		fontWeight: 'bold',
		fontSize: 'xl',
	},
});

export default defineMultiStyleConfig({ baseStyle });
