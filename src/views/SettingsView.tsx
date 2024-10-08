import { useEffect } from 'react';
import { Button, Text, useDisclosure, Container, Flex, Box } from '@chakra-ui/react';
import useViewer from '@queries/useViewer';
import usedeleteOwnAccount from '@@/src/hooks/mutations/useDeleteOwnAccount';
import useLogout from '@mutations/useLogout';
import ChangeProfileSlugView from '@views/ChangeProfileSlugView';
import ChangePasswordView from '@views/ChangePasswordView';
import ChangeEmailView from '@views/ChangeEmailView';
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

	const { logoutMutation } = useLogout();

	const { deleteOwnAccountMutation, result: deleteOwnAccountResult } = usedeleteOwnAccount();
	const [{ loggedInId }] = useViewer();
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

	const handleDeleteOwnAccount = () => {
		// TODO: Add confirmation dialog
		deleteOwnAccountMutation(loggedInId);
	};

	useEffect(() => {
		if (deleteOwnAccountResult.data) {
			logoutMutation().then(() => {
				window.location.href = '/';
			});
		}
	}, [deleteOwnAccountResult.data]);

	return (
		<Container maxW={'4xl'} pl={0} mx={0}>
			<SettingsSection title={'Account'}>
				<Flex gap={2}>
					<Box>
						<Button onClick={handleEmailClick} colorScheme={'gray'}>
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
						<Button onClick={handlePasswordClick} colorScheme={'gray'}>
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

			<SettingsSection title={'Profile'}>
				<ChangeProfileSlugView />
			</SettingsSection>

			<SettingsSection title={'Options'}>
				<DisableProfileToggle showHelperText={true} size={'lg'} />
				<DarkModeToggle showHelperText={true} size={'lg'} />
			</SettingsSection>

			{/* TODO Setting: Close your account */}
			<SettingsSection title={'Close your account'}>
				<Text>If you'd like to remove your account entirely, please use the button below.</Text>
				<Button colorScheme={'red'} onClick={handleDeleteOwnAccount}>
					Delete account
				</Button>
			</SettingsSection>
		</Container>
	);
}
