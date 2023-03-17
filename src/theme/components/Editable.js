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
		// px: 4,
		// py: 1,
		// my: 1,
		_hover: {
			borderBottomColor: 'black',
		},
	},
	input: {
		borderTopStyle: 'solid',
		borderTopWidth: '1px',
		borderTopColor: 'gray.200',
		borderBottomWidth: '3px',
		borderBottomColor: 'gray.400',
		borderBottomStyle: 'solid',
		bg: 'whiteAlpha.700',
		// px: 4,
		// py: 1,
		// my: 1,
		_focus: {
			boxShadow: 'none',
		},
	},
	textarea: {
		borderWidth: '3px',
		borderColor: 'gray.400',
		borderStyle: 'solid',
		bg: 'whiteAlpha.700',
		_focus: {
			boxShadow: 'none',
		},
	},
});

export default defineMultiStyleConfig({ baseStyle });
