import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Box, Spinner, Flex } from '@chakra-ui/react';
import { ChangePasswordInput } from '../lib/types';
import { useChangePasswordError } from '../hooks/hooks';
import useChangeUserPassword from '../hooks/mutations/useChangeUserPassword';
import useLogout from '../hooks/mutations/useLogout';
import TextInput from './common/inputs/TextInput';

interface Props {
	username: string;
}

// TODO Set up ChangeEmail

export default function ChangePassword({ username }: Props) {
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
	const errorMessage = useChangePasswordError(errorCode);
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
		<Box borderRadius='lg' w='full'>
			<Box mt={2}>
				<form onSubmit={handleSubmit}>
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
					<Box mt={4}>
						<Button
							type='submit'
							colorScheme='orange'
							isDisabled={!formIsValid || submitLoading}
							isLoading={!!submitLoading}
						>
							Change password
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
}
