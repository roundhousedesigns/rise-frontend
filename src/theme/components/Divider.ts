import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
	my: 4,
	borderWidth: '2px',
	_light: {
		borderColor: 'text.dark',
	},
	_dark: {
		borderColor: 'text.light',
	},
});

export default defineStyleConfig({
	baseStyle,
});
