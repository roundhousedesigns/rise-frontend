import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	cardAnatomy.keys
);

const baseStyle = definePartsStyle({
	container: {
		gap: 4,
		my: 4,
		p: 4,
	},
	header: {
		mb: 0,
		py: 0,
		fontSize: '2xl',
		fontWeight: 'bold',
	},
});

const variants = {
	optionToggle: definePartsStyle({
		container: {
			my: 0,
			py: 4,
			flex: 1,
		},
	}),
};

export default defineMultiStyleConfig({ baseStyle, variants });
