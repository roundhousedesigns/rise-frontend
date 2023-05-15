import {
	Card,
	FormControl,
	FormLabel,
	Icon,
	Switch,
	useColorMode,
} from '@chakra-ui/react';
import Page from '../components/Page';
import SettingsSection from '../components/common/SettingsSection';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Settings() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Page title='Settings'>
			<Card>
				<SettingsSection title='Theme'>
					<FormControl display='flex' alignItems='center'>
						<Icon as={colorMode === 'dark' ? FiMoon : FiSun} mx={2} boxSize={6} />
						<FormLabel htmlFor='colorMode' mb='0'>
							Dark Mode?
						</FormLabel>
						<Switch id='colorMode' onChange={toggleColorMode} />
					</FormControl>
				</SettingsSection>

				{/* <SettingsSection title='Change your password'>

				</SettingsSection> */}

				{/* TODO Setting: Change your email */}
				{/* TODO Setting: Change your password */}
				{/* TODO Setting: Delete your account */}
			</Card>
		</Page>
	);
}
