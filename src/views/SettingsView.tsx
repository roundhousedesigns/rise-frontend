import { Button, Link, Stack, StackItem, Text, useDisclosure, Container } from '@chakra-ui/react';
import ChangeProfileSlugView from '@views/ChangeProfileSlugView';
import SettingsSection from '@/components/common/SettingsSection';
import DisableProfileToggle from '@components/DisableProfileToggle';
import DarkModeToggle from '@components/DarkModeToggle';
import { SettingsModal } from '@/components/common/SettingsModal';
import ChangePasswordView from './ChangePasswordView';
import ChangeEmailView from './ChangeEmailView';
// import LookingForWorkToggle from '@components/LookingForWorkToggle';

export default function SettingsView() {
	const {
		isOpen: isOpenPassword,
		onOpen: onOpenPassword,
		onClose: onClosePassword,
	} = useDisclosure();

	const { isOpen: isOpenEmail, onOpen: onOpenEmail, onClose: onCloseEmail } = useDisclosure();

	const handlePasswordClick = () => {
		onOpenPassword();
	};

	const handleEmailClick = () => {
		onOpenEmail();
	};

	return (
		<Container maxW='4xl' pl={0} mx={0}>
			<SettingsSection title='Account'>
				<Stack>
					<StackItem>
						<Button onClick={handleEmailClick} colorScheme='blue'>
							Change your email address
						</Button>
						<SettingsModal
							title='Change your account email'
							isOpen={isOpenEmail}
							onClose={onCloseEmail}
						>
							<ChangeEmailView />
						</SettingsModal>
					</StackItem>

					<StackItem>
						<Button onClick={handlePasswordClick} colorScheme='red'>
							Update your password
						</Button>
						<SettingsModal
							title='Change your password'
							isOpen={isOpenPassword}
							onClose={onClosePassword}
						>
							<ChangePasswordView />
						</SettingsModal>
					</StackItem>
				</Stack>
			</SettingsSection>

			<SettingsSection title='Your profile link'>
				<ChangeProfileSlugView />
			</SettingsSection>

			<SettingsSection title='Options'>
				<DisableProfileToggle showHelperText={true} size='lg' />
				{/* <LookingForWorkToggle showHelperText={true} size='lg' /> */}
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
		</Container>
	);
}
