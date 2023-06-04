import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';
import { avatarAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	avatarAnatomy.keys
);

const superLg = defineStyle({
	width: 40,
	height: 40,
	fontSize: '3xl',
});

const sizes = {
	superLg: definePartsStyle({ container: superLg }),
};

export default defineMultiStyleConfig({ sizes });
