import { extendTheme } from '@chakra-ui/react';

// Global overrides
import { styles } from './global';

// Foundational style overrides
import { colors } from './foundations/colors';
import { fonts } from './foundations/fonts';

// Component style overrides
import headingTheme from './components/Heading';
import textTheme from './components/Text';
import linkTheme from './components/Link';
import cardTheme from './components/Card';
import buttonTheme from './components/Button';
import menuTheme from './components/Menu';
import accordionTheme from './components/Accordion';
import alertTheme from './components/Alert';
import editableTheme from './components/Editable';
import spinnerTheme from './components/Spinner';
import inputTheme from './components/Input';
import dividerTheme from './components/Divider';
import avatarTheme from './components/Avatar';
import badgeTheme from './components/Badge';
import radioTheme from './components/Radio';
import checkboxTheme from './components/Checkbox';

// Config
const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const overrides = {
	config,
	styles,
	fonts,
	colors,
	components: {
		Heading: headingTheme,
		Text: textTheme,
		Link: linkTheme,
		Card: cardTheme,
		Button: buttonTheme,
		Menu: menuTheme,
		Accordion: accordionTheme,
		Alert: alertTheme,
		Editable: editableTheme,
		Spinner: spinnerTheme,
		Input: inputTheme,
		Divider: dividerTheme,
		Avatar: avatarTheme,
		Badge: badgeTheme,
		Radio: radioTheme,
		Checkbox: checkboxTheme,
	},
};

export default extendTheme(overrides);
