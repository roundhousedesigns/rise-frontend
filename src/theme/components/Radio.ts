import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { radioCheckboxButtonStyleObject } from '@theme/global';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	radioAnatomy.keys
);

const buttonStyle = definePartsStyle({
	...radioCheckboxButtonStyleObject,
});

export default defineMultiStyleConfig({
	variants: { buttonStyle },
});
