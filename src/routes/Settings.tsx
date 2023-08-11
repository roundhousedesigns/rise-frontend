import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Link,
	Switch,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import Page from '../components/Page';
import ChangePasswordView from '../views/ChangePasswordView';
import ChangeProfileSlugView from '../views/ChangeProfileSlugView';
import WrapWithIcon from '../components/common/WrapWithIcon';
import SettingsSection from '../components/common/SettingsSection';

export default function Settings() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Page title='Settings'>
			<Flex gap={6} mt={2} flexWrap='wrap'>
				<SettingsSection title='Change your password'>
					<Box w='full'>
						<ChangePasswordView />
					</Box>
				</SettingsSection>

				{/* TODO Setting: Change your email */}

				<SettingsSection title='Profile Tag'>
					<ChangeProfileSlugView />
				</SettingsSection>

				<SettingsSection title='Theme'>
					<FormControl display='flex' alignItems='center'>
						<Switch
							id='colorMode'
							onChange={toggleColorMode}
							isChecked={colorMode === 'dark'}
							mr={2}
							colorScheme='green'
						/>
						<WrapWithIcon
							as={FormLabel}
							htmlFor='colorMode'
							mx={2}
							fontSize='lg'
							icon={colorMode === 'dark' ? FiMoon : FiSun}
						>
							Dark Mode
						</WrapWithIcon>
					</FormControl>
				</SettingsSection>

				{/* TODO Setting: Delete your account */}
				<SettingsSection title='Delete your account'>
					<Text>
						If you'd like to delete your account entirely, please email us at{' '}
						<Link href='mailto:support@risetheatre.org' display='inline'>
							support@risetheatre.org
						</Link>{' '}
						to request your removal.
					</Text>
				</SettingsSection>
			</Flex>
		</Page>
	);
}
