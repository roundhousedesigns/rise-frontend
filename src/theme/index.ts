import { extendTheme } from '@chakra-ui/react';

// Global overrides
import { styles } from './global';

// Foundational style overrides
import { colors } from './foundations/colors';
import { fonts } from './foundations/fonts';

// Component style overrides
import headingTheme from '@theme/components/Heading';
import textTheme from '@theme/components/Text';
import linkTheme from '@theme/components/Link';
import cardTheme from '@theme/components/Card';
import buttonTheme from '@theme/components/Button';
import menuTheme from '@theme/components/Menu';
import accordionTheme from '@theme/components/Accordion';
import alertTheme from '@theme/components/Alert';
import editableTheme from '@theme/components/Editable';
import spinnerTheme from '@theme/components/Spinner';
import inputTheme from '@theme/components/Input';
import dividerTheme from '@theme/components/Divider';
import avatarTheme from '@theme/components/Avatar';
import badgeTheme from '@theme/components/Badge';
import radioTheme from '@theme/components/Radio';
import checkboxTheme from '@theme/components/Checkbox';
import markTheme from '@theme/components/Mark';

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
		Mark: markTheme,
	},
};

export default extendTheme(overrides);
