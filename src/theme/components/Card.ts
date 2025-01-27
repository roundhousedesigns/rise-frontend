import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	cardAnatomy.keys
);

const baseStyle = definePartsStyle({
	container: {
		gap: 4,
		my: 4,
		p: 4,
	},
	header: {
		mb: 0,
		py: 0,
		fontSize: '2xl',
		fontWeight: 'bold',
	},
});

const variants = {
	gray: definePartsStyle({
		container: {
			_dark: {
				bgColor: 'gray.800',
				borderColor: 'gray.700',
			},
			_light: {
				bgColor: 'gray.100',
				borderColor: 'gray.200',
			},
		},
	}),
	important: definePartsStyle({
		container: {
			bgColor: 'brand.red',
		},
	}),
	listItem: definePartsStyle({
		container: {
			px: 2,
			py: 3,
			my: 0,
			mr: 4,
			_dark: {
				_hover: {
					bg: 'gray.700',
				},
			},
			_light: {
				_hover: {
					bg: 'gray.200',
				},
			},
		},
	}),
};

export default defineMultiStyleConfig({ baseStyle, variants });
