import { Icon, Wrap, Text, useColorMode, Flex, Highlight } from '@chakra-ui/react';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';
import { FiMoon, FiSun } from 'react-icons/fi';

interface Props {
	size?: string;
	showLabel?: boolean;
}

export default function DarkModeToggle({ size = 'md', showLabel }: Props) {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex alignItems='center' justifyContent='flex-start'>
			<ToggleOptionSwitch
				id='darkMode'
				checked={colorMode === 'dark'}
				callback={toggleColorMode}
				label='Color mode'
				icon={FiSun}
				iconRight={FiMoon}
				size={size}
			>
				{showLabel ? <Subtext colorMode={colorMode} /> : <></>}
			</ToggleOptionSwitch>
		</Flex>
	);
}

const Subtext = ({ colorMode }: { colorMode: string }) => {
	return colorMode === 'dark' ? (
		<Text as='span'>
			<Highlight query={['dark']} styles={{ bg: 'yellow.200', px: 1, mx: 1 }}>
				Dark mode
			</Highlight>
		</Text>
	) : (
		<Text as='span'>
			<Highlight query={['light']} styles={{ bg: 'yellow.200', px: 1, mx: 1 }}>
				Light mode
			</Highlight>
		</Text>
	);
};
