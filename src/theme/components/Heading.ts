import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	variants: {
		pageTitle: {
			fontSize: '4xl',
		},
		pageSubtitle: {
			fontSize: '3xl',
		},
		contentTitle: {
			fontSize: '2xl',
			fontWeight: 'bold',
			pb: 0,
		},
		contentSubtitle: {
			fontSize: 'md',
			fontWeight: 'medium',
			mt: 0,
			pb: 0,
		},
		searchFilterTitle: {
			size: 'md',
			mb: 6,
			w: 'full',
			borderBottom: '2px',
			borderColor: 'gray.600',
		},
	},
});
