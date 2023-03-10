import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	cardAnatomy.keys
);

const variants = {
	default: definePartsStyle({
		container: {
			gap: 4,
			my: 4,
			p: 4,
			_light: {
				bgColor: 'gray.100',
			},
			_dark: {
				bgColor: 'gray.700',
			},
		},
		body: {},
		header: {
			mb: 0,
			py: 0,
			fontSize: '2xl',
			fontWeight: 'bold',
		},
		body: {
			pb: 0,
		},
	}),
};

const defaultProps = {
	variant: 'default',
};

export default defineMultiStyleConfig({ variants, defaultProps });
