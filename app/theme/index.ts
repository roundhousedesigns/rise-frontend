import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Foundational style overrides
import { colors } from './foundations/colors';
import { fonts } from './foundations/fonts';

// Config
const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

// Make sure color mode is properly typed
const overrides = {
	config,
	fonts,
	colors,
	styles: {
		global: (props: any) => ({
			body: {
				bg: 'bg.dark',
				color: 'text.light',
			},
			'html, body': {
				colorScheme: 'dark',
			}
		})
	},
	components: {
		// We'll add component overrides as needed
	},
};

export default extendTheme(overrides); 