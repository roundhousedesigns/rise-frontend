import { Box, Divider, Flex, Link, Text } from '@chakra-ui/react';
import Page from '@components/Page';
import ChangePasswordView from '@views/ChangePasswordView';
import ChangeProfileSlugView from '@views/ChangeProfileSlugView';
import SettingsSection from '@common/SettingsSection';
import DisableProfileToggle from '@components/DisableProfileToggle';
import DarkModeToggle from '@/components/DarkModeToggle';
import UnavailableForWorkToggle from '@/components/UnavailableForWorkToggle';

export default function Settings() {
	return (
		<Page title='Account Settings'>
			<Flex gap={6} mt={2} flexWrap='wrap'>
				<SettingsSection title='Change your password'>
					<Box w='full'>
						<ChangePasswordView />
					</Box>
				</SettingsSection>

				{/* TODO Setting: Change your email */}

				<SettingsSection title='Profile link'>
					<ChangeProfileSlugView />
				</SettingsSection>

				<SettingsSection title='Options'>
					<DisableProfileToggle showHelperText={true} size='lg' />
					<UnavailableForWorkToggle showHelperText={true} size='lg' />
					<Divider />
					<DarkModeToggle showHelperText={true} size='lg' />
				</SettingsSection>

				{/* TODO Setting: Close your account */}
				<SettingsSection title='Close your account'>
					<Text>
						If you'd like to remove your account entirely, please email us at{' '}
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
