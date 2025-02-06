import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
	mb: 2,
	fontWeight: 'normal',
});

const variants = {
	pageTitle: defineStyle({
		fontSize: '4xl',
	}),
	pageSubtitle: defineStyle({
		fontSize: '3xl',
		fontWeight: 'bold',
	}),
	contentTitle: defineStyle({
		fontSize: '2xl',
		fontWeight: 'bold',
		pb: 0,
	}),
	contentSubtitle: defineStyle({
		fontSize: 'lg',
		fontWeight: 'bold',
		mt: 0,
		pb: 0,
	}),
	centerline: defineStyle({
		size: 'lg',
		_light: {
			bg: 'bg.light',
		},
		_dark: {
			bg: 'bg.dark',
			color: 'text.light',
		},
		display: 'inline',
		lineHeight: 'none',
		zIndex: '2',
		pr: 2,
	}),
	searchFilterTitle: defineStyle({
		fontSize: '3xl',
		mb: 6,
		w: 'full',
		borderBottom: '2px',
		borderColor: 'gray.600',
	}),
};

export default defineStyleConfig({
	baseStyle,
	variants,
});
