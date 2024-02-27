import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
	borderRadius: 'md',
	px: '2',
	rounded: 'md',
	lineHeight: 1.5,
});

export default defineStyleConfig({
	baseStyle,
});
