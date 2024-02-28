import { Box, Flex, Icon, Link, Text, useColorMode } from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import Page from '@components/Page';
import ChangePasswordView from '@views/ChangePasswordView';
import ChangeProfileSlugView from '@views/ChangeProfileSlugView';
import SettingsSection from '@common/SettingsSection';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';
import DisableProfileToggle from '@components/DisableProfileToggle';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Settings() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Page title='Account Settings'>
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

				<SettingsSection title='Options'>
					<DisableProfileToggle showLabel={true} />
					<DarkModeToggle showLabel={true} />
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
