import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { chakra, Button, Box, Flex } from '@chakra-ui/react';
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
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');
	const {
		changeUserPasswordMutation,
		results: { loading: submitLoading },
	} = useChangeUserPassword();
	const errorMessage = useErrorMessage(errorCode);
	const { logoutMutation } = useLogout();

	// useEffect to check if form is valid
	useEffect(() => {
		setFormIsValid(newPassword.length > 0 && confirmPassword.length > 0 && passwordsMatch);
	}, [passwordsMatch, newPassword, confirmPassword]);

	// useEffect to check if passwords match, debounce to prevent spamming
	useEffect(() => {
		const timer = setTimeout(() => {
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

		// MICHAEL TEST
		console.log(useValidatePassword(newPassword))
		//

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

	const passwordsMatchError = () => {
		return passwordsMatch || (!passwordsMatch && (!newPassword || !confirmPassword))
			? ''
			: 'Passwords do not match';
	};

	return (
		<chakra.form onSubmit={handleSubmit} mt={3} w='full'>
			<Flex gap={6} flexWrap='wrap'>
				<TextInput
					value={currentPassword}
					name='currentPassword'
					id='currentPassword'
					variant='filled'
					label='Current Password'
					isRequired
					onChange={handleInputChange}
					error={errorMessage}
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
					error={passwordsMatchError()}
					onChange={handleInputChange}
					flex='1'
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
