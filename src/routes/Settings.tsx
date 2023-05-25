import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Icon,
	Switch,
	useColorMode,
} from '@chakra-ui/react';
import Page from '../components/Page';
import SettingsSection from '../components/common/SettingsSection';
import { FiMoon, FiSun } from 'react-icons/fi';
import ChangePasswordView from '../views/ChangePasswordView';
import { useViewer } from '../hooks/queries/useViewer';

export default function Settings() {
	const { email } = useViewer();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Page title='Settings'>
			<Flex gap={6} mt={4} justifyContent='space-between'>
				<SettingsSection title='Theme'>
					<FormControl display='flex' alignItems='center'>
						<Switch id='colorMode' onChange={toggleColorMode} mr={2} />
						<FormLabel htmlFor='colorMode' mb='0' mx={2}>
							Dark Mode?
						</FormLabel>
						<Icon as={colorMode === 'dark' ? FiMoon : FiSun} boxSize={6} />
					</FormControl>
				</SettingsSection>

				<SettingsSection title='Change your password'>
					<Box w='full' maxW='600px'>
						<ChangePasswordView username={email} />
					</Box>
				</SettingsSection>

				{/* TODO Setting: Change your email */}
				{/* TODO Setting: Delete your account */}
			</Flex>
		</Page>
	);
}
