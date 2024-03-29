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
				icon={FiSun}
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
	return colorMode === 'dark' ? (
		<Text as='span'>
			<Highlight query={['dark']} styles={{ bg: 'yellow.200', px: 1 }}>
				Dark mode
			</Highlight>
		</Text>
	) : (
		<Text as='span'>
			<Highlight query={['light']} styles={{ bg: 'yellow.200', px: 1 }}>
				Light mode
			</Highlight>
		</Text>
	);
};
