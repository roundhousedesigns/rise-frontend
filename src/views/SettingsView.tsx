import { Button, Link, Text, useDisclosure, Container, Flex, Box } from '@chakra-ui/react';
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

	const handleEmailClose = () => {
		onCloseEmail();
	};

	return (
		<Container maxW='4xl' pl={0} mx={0}>
			<SettingsSection title='Account'>
				<Flex gap={4}>
					<Box>
						<Button onClick={handleEmailClick} colorScheme='blue'>
							Change your email address
						</Button>
						<SettingsModal
							title='Change your account email'
							isOpen={isOpenEmail}
							onClose={handleEmailClose}
						>
							<ChangeEmailView onSubmitCallback={handleEmailClose} />
						</SettingsModal>
					</Box>

					<Box>
						<Button onClick={handlePasswordClick} colorScheme='blue'>
							Change your password
						</Button>
						<SettingsModal
							title='Change your password'
							isOpen={isOpenPassword}
							onClose={onClosePassword}
						>
							<ChangePasswordView />
						</SettingsModal>
					</Box>
				</Flex>
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
					to let us know, and we'll delete your profile permanently.
				</Text>
			</SettingsSection>
		</Container>
	);
}
