import { useEffect, useState } from 'react';
import { Button, Box, Spinner, useToast, Flex } from '@chakra-ui/react';
import TextInput from '../components/common/inputs/TextInput';
import { useChangeUserPassword } from '../hooks/mutations/useChangeUserPassword';
import { ChangePasswordInput } from '../lib/types';

interface Props {
	username: string;
}

export default function ChangePasswordView({ username }: Props) {
	const [userFields, setUserFields] = useState<ChangePasswordInput>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const { currentPassword, newPassword, confirmPassword } = userFields;
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
	const {
		changeUserPasswordMutation,
		results: { loading: submitLoading },
	} = useChangeUserPassword();

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserFields({
			...userFields,
			[e.target.name]: e.target.value,
		});
	};

	const toast = useToast();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!currentPassword || !newPassword || !passwordsMatch) return;

		changeUserPasswordMutation(username, currentPassword, newPassword)
			.then(() => {
				toast({
					title: 'Success!',
					description: 'Your password has been changed.',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'top',
				});
			})
			.catch((errors) => {
				toast({
					title: 'Error',
					description: errors || 'Something went wrong.',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'top',
				});
			});
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
						<Button type='submit' colorScheme='orange' isDisabled={!formIsValid || submitLoading}>
							{submitLoading ? <Spinner size='sm' /> : 'Change password'}
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
}
