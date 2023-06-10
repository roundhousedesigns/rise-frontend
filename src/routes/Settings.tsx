import { Box, FormControl, FormLabel, Stack, Switch, useColorMode } from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import Page from '../components/Page';
import SettingsSection from '../components/common/SettingsSection';
import ChangePasswordView from '../views/ChangePasswordView';
import ChangeProfileSlugView from '../views/ChangeProfileSlugView';
import TextWithIcon from '../components/common/TextWithIcon';

export default function Settings() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Page title='Settings'>
			<Stack direction='column' spacing={4} maxW='2xl' mx='auto' mt={4}>
				<SettingsSection title='Theme'>
					<FormControl display='flex' alignItems='center'>
						<Switch
							id='colorMode'
							onChange={toggleColorMode}
							isChecked={colorMode === 'dark'}
							mr={2}
							colorScheme='green'
						/>
						<TextWithIcon
							as={FormLabel}
							htmlFor='colorMode'
							mx={2}
							fontSize='lg'
							icon={colorMode === 'dark' ? FiMoon : FiSun}
						>
							Dark Mode
						</TextWithIcon>
					</FormControl>
				</SettingsSection>

				<SettingsSection title='Change your password'>
					<Box w='full'>
						<ChangePasswordView />
					</Box>
				</SettingsSection>

				{/* TODO Setting: Change your email */}

				{/* TODO Setting: Change your slug */}
				<SettingsSection title='Profile Tag'>
					<ChangeProfileSlugView />
				</SettingsSection>

				{/* TODO Setting: Delete your account */}
			</Stack>
		</Page>
	);
}
