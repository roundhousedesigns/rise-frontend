import { Text, useColorMode, Highlight, Box } from '@chakra-ui/react';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';
import { FiMoon, FiSun } from 'react-icons/fi';

interface Props {
	size?: string;
	showLabel?: boolean;
	showHelper?: boolean;
	[prop: string]: any;
}

export default function DarkModeToggle({
	size = 'md',
	showLabel = true,
	showHelperText = true,
	...props
}: Props): JSX.Element {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box {...props}>
			<ToggleOptionSwitch
				id='darkMode'
				checked={colorMode === 'dark'}
				callback={toggleColorMode}
				label='Theme'
				iconLeft={FiSun}
				iconRight={FiMoon}
				size={size}
				showLabel={showLabel}
			>
				{showHelperText ? <Subtext colorMode={colorMode} /> : <></>}
			</ToggleOptionSwitch>
		</Box>
	);
}

const Subtext = ({ colorMode }: { colorMode: string }) => {
	const text = colorMode === 'dark' ? 'Dark mode' : 'Light mode';

	return (
		<Text as='span'>
			<Highlight query={[colorMode]} styles={{ bg: 'brand.yellow', px: 1 }}>
				{text}
			</Highlight>
		</Text>
	);
};
