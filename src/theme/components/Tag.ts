import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys);

const xs = defineStyle({
	px: '1',
	py: '0',
	fontSize: 'xs',
});

const sizes = {
	xs: definePartsStyle({ container: xs, label: xs }),
};

export default defineMultiStyleConfig({ sizes });
