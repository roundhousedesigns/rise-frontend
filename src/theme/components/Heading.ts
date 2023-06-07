import { defineStyleConfig } from '@chakra-ui/react';

// TODO use defineStyle

export default defineStyleConfig({
	baseStyle: {
		mb: 2,
		fontWeight: 'normal'
	},
	variants: {
		pageTitle: {
			fontSize: '4xl',
		},
		pageSubtitle: {
			fontSize: '3xl',
		},
		contentTitle: {
			fontSize: '2xl',
			pb: 0,
		},
		contentSubtitle: {
			fontSize: 'md',
			fontWeight: 'medium',
			mt: 0,
			pb: 0,
		},
		centerline: {
			size: 'lg',
			bg: 'text.light',
			_dark: {
				bg: 'text.dark',
				color: 'text.light',
			},
			display: 'inline',
			lineHeight: 'none',
			zIndex: '2',
			pr: 2,
		},
		searchFilterTitle: {
			fontSize: '3xl',
			mb: 6,
			w: 'full',
			borderBottom: '2px',
			borderColor: 'gray.600',
		},
	},
});
