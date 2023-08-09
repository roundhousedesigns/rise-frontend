import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { chakra, Button, Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { FiHelpCircle } from 'react-icons/fi';
import { ChangePasswordInput } from '../lib/types';
import { useErrorMessage, useValidatePassword } from '../hooks/hooks';
import useViewer from '../hooks/queries/useViewer';
import useChangeUserPassword from '../hooks/mutations/useChangeUserPassword';
import useLogout from '../hooks/mutations/useLogout';
import TextInput from '../components/common/inputs/TextInput';

export default function ChangePasswordView() {
	const { email: username } = useViewer();

	const [userFields, setUserFields] = useState<ChangePasswordInput>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const { currentPassword, newPassword, confirmPassword } = userFields;
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
	const [passwordStrongEnough, setPasswordStrongEnough] = useState<boolean>(false);
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');
	const {
		changeUserPasswordMutation,
		results: { loading: submitLoading },
	} = useChangeUserPassword();
	const errorMessage = useErrorMessage(errorCode);
	const { logoutMutation } = useLogout();

	const newPasswordStrength = useValidatePassword(newPassword);

	// Set an error code if either of the password checks doesn't pass, otherwise set form is valid
	useEffect(() => {
		setFormIsValid(false);
		if (!passwordsMatch) return setErrorCode('password_mismatch');
		else if (newPassword.length && !passwordStrongEnough) return setErrorCode('password_too_weak');
		else setFormIsValid(true);
		setErrorCode('');
	}, [passwordsMatch, newPassword, confirmPassword, passwordStrongEnough]);

	// Check if passwords match and are complex enough, debounce to prevent spamming
	useEffect(() => {
		const timer = setTimeout(() => {
			setPasswordStrongEnough(newPasswordStrength === 'strong');
			setPasswordsMatch(newPassword === confirmPassword);
		}, 500);
		return () => clearTimeout(timer);
	}, [newPassword, confirmPassword]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserFields({
			...userFields,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!currentPassword || !newPassword || !passwordsMatch) return;

		changeUserPasswordMutation(username, currentPassword, newPassword)
			.then(() => {
				setUserFields({
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				});
				setErrorCode('');

				logoutMutation().then(() => {
					window.location.href =
						'/login?alert=Success! Please log in with your new password.&alertStatus=success';
				});
			})
			.catch((errors: { message: string }) => setErrorCode(errors.message));
	};

	return (
		<chakra.form onSubmit={handleSubmit} mt={3} w='full'>
			<Flex gap={6} flexWrap='wrap'>
				<TextInput
					value={currentPassword}
					name='currentPassword'
					id='currentPassword'
					variant='filled'
					label={
						<>
							Current password{' '}
							<Tooltip
								hasArrow
								label='Passwords must have at least one lowercase letter, one uppercase letter, one number, and one special character.'
							>
								<chakra.span>
									<Icon as={FiHelpCircle} />
								</chakra.span>
							</Tooltip>
						</>
					}
					isRequired
					onChange={handleInputChange}
					error={errorCode === 'incorrect_password' ? errorMessage : ''}
					inputProps={{
						type: 'password',
						autoComplete: 'current-password',
					}}
				/>
				<TextInput
					value={newPassword}
					name='newPassword'
					id='newPassword'
					variant='filled'
					label='New password'
					isRequired
					onChange={handleInputChange}
					error={
						errorCode && errorCode !== 'incorrect_password' && errorCode !== 'password_mismatch'
							? errorMessage
							: ''
					}
					flex='1'
					inputProps={{
						type: 'password',
						autoComplete: 'new-password',
					}}
				/>
				<TextInput
					value={confirmPassword}
					name='confirmPassword'
					id='confirmPassword'
					type='password'
					variant='filled'
					label='Confirm your new password'
					isRequired
					error={errorCode && errorCode === 'password_mismatch' ? errorMessage : ''}
					onChange={handleInputChange}
					flex={{ base: 'auto', md: '1' }}
					inputProps={{
						type: 'password',
						autoComplete: 'new-password',
					}}
				/>
			</Flex>
			<Box mt={2}>
				<Button
					type='submit'
					colorScheme='orange'
					isDisabled={!formIsValid || submitLoading}
					isLoading={!!submitLoading}
				>
					Change password
				</Button>
			</Box>
		</chakra.form>
	);
}
