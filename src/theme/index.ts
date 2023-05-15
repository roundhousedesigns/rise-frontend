import { extendTheme } from '@chakra-ui/react';

// Global overrides
import { styles } from './global';

// Foundational style overrides
import { colors } from './foundations/colors';
import { fonts /*fontWeights*/ } from './foundations/fonts';

// Component style overrides
import headingTheme from './components/Heading';
import textTheme from './components/Text';
import linkTheme from './components/Link';
import cardTheme from './components/Card';
import buttonTheme from './components/Button';
import menuTheme from './components/Menu';
import accordionTheme from './components/Accordion';
import editableTheme from './components/Editable';
import spinnerTheme from './components/Spinner';
import inputTheme from './components/Input';
import dividerTheme from './components/Divider';

// Config
const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const overrides = {
	config,
	styles,
	fonts,
	// fontWeights,
	colors,
	components: {
		Heading: headingTheme,
		Text: textTheme,
		Link: linkTheme,
		Card: cardTheme,
		Button: buttonTheme,
		Menu: menuTheme,
		Accordion: accordionTheme,
		Editable: editableTheme,
		Spinner: spinnerTheme,
		Input: inputTheme,
		Divider: dividerTheme,
	},
};

export default extendTheme(overrides);
