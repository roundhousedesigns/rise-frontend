import { extendTheme } from '@chakra-ui/react';

// Global overrides
import { styles } from '@theme/global';

// Foundational style overrides
import { colors } from '@theme/foundations/colors';
import { fonts } from '@theme/foundations/fonts';

// Component style overrides
import accordionTheme from '@theme/components/Accordion';
import alertTheme from '@theme/components/Alert';
import avatarTheme from '@theme/components/Avatar';
import badgeTheme from '@theme/components/Badge';
import buttonTheme from '@theme/components/Button';
import cardTheme from '@theme/components/Card';
import checkboxTheme from '@theme/components/Checkbox';
import dividerTheme from '@theme/components/Divider';
import editableTheme from '@theme/components/Editable';
import headingTheme from '@theme/components/Heading';
import inputTheme from '@theme/components/Input';
import linkTheme from '@theme/components/Link';
import markTheme from '@theme/components/Mark';
import menuTheme from '@theme/components/Menu';
import radioTheme from '@theme/components/Radio';
import spinnerTheme from '@theme/components/Spinner';
import textTheme from '@theme/components/Text';
import tooltipTheme from '@theme/components/Tooltip';
import containerTheme from '@theme/components/Container';
import tagTheme from '@theme/components/Tag';
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
		Avatar: avatarTheme,
		Badge: badgeTheme,
		Button: buttonTheme,
		Card: cardTheme,
		Checkbox: checkboxTheme,
		Divider: dividerTheme,
		Editable: editableTheme,
		Alert: alertTheme,
		Heading: headingTheme,
		Input: inputTheme,
		Link: linkTheme,
		Menu: menuTheme,
		Accordion: accordionTheme,
		Mark: markTheme,
		Radio: radioTheme,
		Spinner: spinnerTheme,
		Text: textTheme,
		Tooltip: tooltipTheme,
		Container: containerTheme,
		Tag: tagTheme,
	},
};

export default extendTheme(overrides);
