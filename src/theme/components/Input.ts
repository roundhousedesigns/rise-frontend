import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	inputAnatomy.keys
);

const xl = defineStyle({
	fontSize: '3xl',
	fontWeight: 'medium',
	px: '4',
	h: '12',
	borderRadius: 'md',
});

const sizes = {
	xl: definePartsStyle({ field: xl, addon: xl }),
};

export default defineMultiStyleConfig({ sizes });
