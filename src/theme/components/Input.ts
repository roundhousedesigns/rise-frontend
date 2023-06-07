import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	inputAnatomy.keys
);

const baseStyle = definePartsStyle({
	field: {
		borderRadius: 'md',
		_placeholder: {
			color: 'gray.500',
		},
	},
});

const xl = defineStyle({
	fontSize: '3xl',
	fontWeight: 'medium',
	px: 2,
	py: 2,
});

const variants = {
	filled: definePartsStyle({
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
	}),
	file: definePartsStyle({
		field: {
			display: 'none',
			border: 'none',
			px: 0,
		},
	}),
};

const sizes = {
	xl: definePartsStyle({ field: xl, addon: xl }),
};

export default defineMultiStyleConfig({ baseStyle, sizes, variants });
