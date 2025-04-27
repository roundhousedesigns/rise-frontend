import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys);

const xs = defineStyle({
	px: '2',
	py: '1',
	fontSize: '2xs',
});

const sizes = {
	xs: definePartsStyle({ container: xs, label: xs }),
};

export default defineMultiStyleConfig({ sizes });
