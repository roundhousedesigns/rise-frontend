import { extendTheme } from '@chakra-ui/react';

// Foundational style overrides
import { colors } from '@/theme/foundations/colors';
import { fonts } from '@/theme/foundations/fonts';
import { sizes } from '@/theme/foundations/sizes';

// Component style overrides
import headingTheme from '@/theme/components/Heading';
import textTheme from '@/theme/components/Text';
import cardTheme from '@/theme/components/Card';
import buttonTheme from '@/theme/components/Button';
import menuTheme from '@/theme/components/Menu';

const overrides = {
	fonts,
	colors,
	sizes,
	components: {
		Heading: headingTheme,
		Text: textTheme,
		Card: cardTheme,
		Button: buttonTheme,
		Menu: menuTheme,
	},
};

export default extendTheme(overrides);
