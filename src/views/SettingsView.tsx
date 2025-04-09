import { Button, Text, useDisclosure, Container, Flex, Box, ButtonGroup } from '@chakra-ui/react';
import ChangeProfileSlugView from '@views/ChangeProfileSlugView';
import ChangePasswordView from '@views/ChangePasswordView';
import ChangeEmailView from '@views/ChangeEmailView';
import DeleteAccountView from '@views/DeleteAccountView';
import SettingsSection from '@components/SettingsSection';
import DisableProfileToggle from '@components/DisableProfileToggle';
import DarkModeToggle from '@components/DarkModeToggle';
import { SettingsModal } from '@components/SettingsModal';

export default function SettingsView() {
	const {
		isOpen: isOpenPassword,
		onOpen: onOpenPassword,
		onClose: onClosePassword,
	} = useDisclosure();

	const {
		isOpen: isOpenDeleteAccount,
		onOpen: onOpenDeleteAccount,
		onClose: onCloseDeleteAccount,
	} = useDisclosure();

	const { isOpen: isOpenEmail, onOpen: onOpenEmail, onClose: onCloseEmail } = useDisclosure();

	const handlePasswordClick = () => {
		onOpenPassword();
	};

	const handleEmailClick = () => {
		onOpenEmail();
	};

	const handleEmailClose = () => {
		onCloseEmail();
	};

	return (
		<Container maxW='4xl' pl={0} mx={0}>
			<SettingsSection title='Account'>
				<Flex gap={2}>
					<Box>
						<Button onClick={handleEmailClick} colorScheme='gray'>
							Change your email address
						</Button>
						<SettingsModal
							title={'Change your account email'}
							isOpen={isOpenEmail}
							onClose={handleEmailClose}
						>
							<ChangeEmailView onSubmitCallback={handleEmailClose} />
						</SettingsModal>
					</Box>

					<Box>
						<Button onClick={handlePasswordClick} colorScheme='gray'>
							Change your password
						</Button>
						<SettingsModal
							title={'Change your password'}
							isOpen={isOpenPassword}
							onClose={onClosePassword}
						>
							<ChangePasswordView />
						</SettingsModal>
					</Box>
				</Flex>
			</SettingsSection>

			<SettingsSection title='Profile'>
				<ChangeProfileSlugView />
			</SettingsSection>

			<SettingsSection title='Options'>
				<DisableProfileToggle showHelperText={true} size='lg' />
				<DarkModeToggle showHelperText={true} size='lg' />
			</SettingsSection>

			<SettingsSection title={'Close your account'}>
				<Text m={0}>
					If you'd like to remove your account entirely and delete your data, please use the button
					below. You can re-register at any time.
				</Text>
				<ButtonGroup>
					<Button colorScheme='red' onClick={onOpenDeleteAccount}>
						Delete account
					</Button>
				</ButtonGroup>
				<SettingsModal
					title={'Delete your account'}
					isOpen={isOpenDeleteAccount}
					onClose={onCloseDeleteAccount}
				>
					<DeleteAccountView onClose={onCloseDeleteAccount} />
				</SettingsModal>
			</SettingsSection>
		</Container>
	);
}
