import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	menuAnatomy.keys
);

const variants = {
	round: definePartsStyle({
		button: {
			border: '2px solid',
			borderRadius: 'full',
		},
	}),
};

export default defineMultiStyleConfig({ variants });
