import { extendTheme } from '@chakra-ui/react';

// Global style overrides
import { styles } from './styles';

// Foundational style overrides
import { colors } from './foundations/colors';
import { sizes } from './foundations/sizes';

// Component style overrides
import headingTheme from './components/Heading';
import textTheme from './components/Text';
import buttonTheme from './components/Button';
import menuTheme from './components/Menu';

const overrides = {
	...styles,
	colors,
	sizes,
	components: {
		Heading: headingTheme,
		Text: textTheme,
		Button: buttonTheme,
		Menu: menuTheme,
	},
};

export default extendTheme(overrides);
