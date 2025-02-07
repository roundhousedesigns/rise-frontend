import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { chakra, Button, Text, Box, Flex, ListItem, List, Card } from '@chakra-ui/react';
import { ChangePasswordInput } from '@lib/types';
import { useErrorMessage, useValidatePassword } from '@hooks/hooks';
import useViewer from '@queries/useViewer';
import useChangeUserPassword from '@mutations/useChangeUserPassword';
import useLogout from '@mutations/useLogout';
import TextInput from '@common/inputs/TextInput';

export default function ChangePasswordView() {
	const [{ email: username }] = useViewer();

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
			<Box my={4}>
				<TextInput
					value={currentPassword}
					name='currentPassword'
					id='currentPassword'
					variant='filled'
					label={'Current password'}
					isRequired
					onChange={handleInputChange}
					error={errorCode === 'incorrect_password' ? errorMessage : ''}
					inputProps={{
						type: 'password',
						autoComplete: 'current-password',
					}}
				/>
			</Box>
			<Card _dark={{ bgColor: 'gray.800' }} my={8} gap={6}>
				<Flex alignItems='center' mx='auto' gap={6} lineHeight='normal' fontSize='xs' pt={1}>
					<Text m={0} fontStyle='italic'>
						Passwords must have at least:
					</Text>
					<List listStyleType='disc'>
						<ListItem>one lowercase letter</ListItem>
						<ListItem>one uppercase letter</ListItem>
						<ListItem>one one number</ListItem>
						<ListItem>one special character.</ListItem>
					</List>
				</Flex>
				<Flex gap={6} flexWrap='wrap'>
					<TextInput
						value={newPassword}
						name='newPassword'
						id='newPassword'
						variant='filled'
						label={'New password'}
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
						label={'Confirm your new password'}
						isRequired
						error={
							errorCode && errorCode === 'password_mismatch' && confirmPassword ? errorMessage : ''
						}
						onChange={handleInputChange}
						flex={{ base: 'auto', md: '1' }}
						inputProps={{
							type: 'password',
							autoComplete: 'new-password',
						}}
					/>
				</Flex>
			</Card>
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
		</chakra.form>
	);
}
