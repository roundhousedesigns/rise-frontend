import { extendTheme } from '@chakra-ui/react';

// Global overrides
import { styles } from './global';

// Foundational style overrides
import { colors } from './foundations/colors';
import { fonts } from './foundations/fonts';

// Component style overrides
import headingTheme from './components/Heading';
import textTheme from './components/Text';
import cardTheme from './components/Card';
import buttonTheme from './components/Button';
import menuTheme from './components/Menu';
import accordionTheme from './components/Accordion';
import editableTheme from './components/Editable';
import spinnerTheme from './components/Spinner';

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
	components: {
		Heading: headingTheme,
		Text: textTheme,
		Card: cardTheme,
		Button: buttonTheme,
		Menu: menuTheme,
		Accordion: accordionTheme,
		Editable: editableTheme,
		Spinner: spinnerTheme,
	},
};

export default extendTheme(overrides);
