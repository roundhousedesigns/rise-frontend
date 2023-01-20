import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const circle = defineStyle({
	border: '2px solid',
	borderRadius: 'full',
});

export default defineStyleConfig({ variants: { circle } });
