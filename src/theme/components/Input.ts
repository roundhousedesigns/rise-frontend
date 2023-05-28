import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	inputAnatomy.keys
);

const baseStyle = definePartsStyle({
	field: {
		_placeholder: {
			color: 'gray.500',
		},
	},
});

const xl = definePartsStyle({
	field: {
		fontSize: '3xl',
		fontWeight: 'medium',
		px: '4',
		h: '12',
		borderRadius: 'md',
	},
});

const variants = {
	filled: {
		field: {
			bg: 'gray.100',
			_hover: {
				bg: 'gray.200',
			},
			_focus: {
				bg: 'gray.200',
			},
			_active: {
				bg: 'gray.200',
			},
		},
	},
};

const sizes = {
	xl: definePartsStyle({ field: xl, addon: xl }),
};

export default defineMultiStyleConfig({ baseStyle, sizes, variants });
