import { defineStyleConfig } from '@chakra-ui/react';

// TODO use defineStyle

export default defineStyleConfig({
	baseStyle: {
		mb: 2,
	},
	variants: {
		pageTitle: {
			fontSize: '4xl',
			fontFamily: `'Stabil Grotesk', sans-serif`,
		},
		pageSubtitle: {
			fontSize: '3xl',
			fontFamily: `'Stabil Grotesk', sans-serif`,
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
			size: 'xl',
			fontFamily: `'Stabil Grotesk', sans-serif`,
			textTransform: 'uppercase',
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
			size: 'md',
			mb: 6,
			w: 'full',
			borderBottom: '2px',
			borderColor: 'gray.600',
		},
	},
});
