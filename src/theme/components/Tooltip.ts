import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

// define the base component styles
const baseStyle = defineStyle({
	borderRadius: 'md',
	borderWidth: '2px',
	px: 2,
	py: 0,
	_dark: {
		bg: 'gray.700',
		color: 'text.light',
		borderColor: 'gray.500',
	},
	_light: {
		bg: 'gray.50',
		color: 'text.dark',
		borderColor: 'gray.300',
	},
});

// export the component theme
export default defineStyleConfig({ baseStyle });
