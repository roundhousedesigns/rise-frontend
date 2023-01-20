import { extendTheme } from '@chakra-ui/react';

// Global style overrides
import styles from './styles';

// Foundational style overrides
// import borders from './foundations/borders';

// Component style overrides
import buttonTheme from './components/Button';
import menuTheme from './components/Menu';

const overrides = {
	...styles,
	// borders,
	components: {
		Button: buttonTheme,
		Menu: menuTheme,
	},
};

export default extendTheme(overrides);
