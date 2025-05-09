import { Text, useColorMode, Highlight, FormControlProps } from '@chakra-ui/react';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';
import { FiMoon, FiSun } from 'react-icons/fi';

interface Props {
	size?: string;
	showLabel?: boolean;
	showHelperText?: boolean;
}

export default function DarkModeToggle({
	size = 'md',
	showLabel = true,
	showHelperText = true,
	...props
}: Props & FormControlProps): JSX.Element {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<ToggleOptionSwitch
			id='darkMode'
			aria-label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
			checked={colorMode === 'dark'}
			callback={toggleColorMode}
			label='Theme'
			iconLeft={FiSun}
			iconRight={FiMoon}
			size={size}
			showLabel={showLabel}
			{...props}
		>
			{showHelperText ? <Subtext colorMode={colorMode} /> : <></>}
		</ToggleOptionSwitch>
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
