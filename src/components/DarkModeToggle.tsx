import { chakra, Text, Highlight, useColorMode } from '@chakra-ui/react';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';
import { FiMoon, FiSun } from 'react-icons/fi';

interface Props {
	size?: string;
	showLabel?: boolean;
	showHelper?: boolean;
	[prop: string]: any;
}

const Subtext = ({ colorMode }: { colorMode: string }) => {
	const text = colorMode === 'dark' ? 'Dark mode' : 'Light mode';

	return (
		<Text as={'span'}>
			<Highlight query={[colorMode]} styles={{ bg: 'brand.yellow', px: 1 }}>
				{text}
			</Highlight>
		</Text>
	);
};

export default function DarkModeToggle({
	size = 'md',
	showLabel = true,
	showHelperText = true,
	...props
}: Props): JSX.Element {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<ToggleOptionSwitch
			id={'darkMode'}
			checked={colorMode === 'dark'}
			callback={toggleColorMode}
			label={'Theme'}
			iconLeft={FiSun}
			iconRight={FiMoon}
			size={size}
			showLabel={showLabel}
			{...props}
		>
			{showHelperText ? (
				<Subtext colorMode={colorMode} />
			) : (
				<chakra.div position={'absolute'} left={'-9999px'} w={0} h={0} />
			)}
		</ToggleOptionSwitch>
	);
}
