import { editableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	editableAnatomy.keys
);

const baseStyle = definePartsStyle({
	preview: {
		borderTopStyle: 'solid',
		borderTopWidth: '1px',
		borderTopColor: 'gray.200',
		borderBottomWidth: '3px',
		borderBottomColor: 'gray.400',
		borderBottomStyle: 'dashed',
		color: 'text.dark',
		bg: 'whiteAlpha.600',
		px: 4,
		py: 1,
		my: 1,
	},
	input: {
		borderTopStyle: 'solid',
		borderTopWidth: '1px',
		borderTopColor: 'gray.200',
		borderBottomWidth: '3px',
		borderBottomColor: 'gray.400',
		borderBottomStyle: 'solid',
		bg: 'whiteAlpha.700',
		px: 4,
		py: 1,
		my: 1,
		_focus: {
			boxShadow: 'none',
		},
	},
	textarea: {
		borderBottomWidth: '3px',
		borderBottomColor: 'teal.400',
		// borderBottomRadius: 'lg',
		_focus: {
			boxShadow: 'none',
		},
	},
});

export default defineMultiStyleConfig({ baseStyle });
