import { extendTheme } from '@chakra-ui/react';

// Global overrides
import { styles } from './styles';

// Foundational style overrides
import { colors } from './foundations/colors';
import { fonts } from './foundations/fonts';
import { sizes } from './foundations/sizes';

// Component style overrides
import headingTheme from './components/Heading';
import textTheme from './components/Text';
import cardTheme from './components/Card';
import buttonTheme from './components/Button';
import menuTheme from './components/Menu';
import accordionTheme from './components/Accordion';

// Config
const config = {
	initialColorMode: 'light',
	useSystemColorMode: true,
};

const overrides = {
	config,
	styles,
	fonts,
	colors,
	sizes,
	components: {
		Heading: headingTheme,
		Text: textTheme,
		Card: cardTheme,
		Button: buttonTheme,
		Menu: menuTheme,
		Accordion: accordionTheme,
	},
};

export default extendTheme(overrides);
