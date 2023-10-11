import { defineStyleConfig, defineStyle } from '@chakra-ui/react';

const baseStyle = defineStyle({
	my: 2,
	lineHeight: 'tall',
	textUnderlineOffset: '0.2em',
	fontWeight: 'medium',
});

export default defineStyleConfig({
	baseStyle,
});
