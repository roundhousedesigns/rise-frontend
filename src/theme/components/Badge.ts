import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
	borderRadius: 'md',
});

const variants = {
	strong: defineStyle({
		px: 2,
		py: 1,
		fontWeight: 'bold',
		_light: {
			bg: 'gray.100',
		},
		_dark: {
			bg: 'gray.600',
		},
	}),
};

export default defineStyleConfig({
	baseStyle,
	variants,
});
