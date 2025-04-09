import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const variants = {
	pageContent: defineStyle(() => {
		return {
			maxWidth: '4xl',
			pt: 4,
			px: 0,
		};
	}),
};

export default defineStyleConfig({
	variants,
});
