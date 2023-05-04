import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	FormErrorMessage,
	Box,
	Stack,
	Spinner,
	Container,
	Heading,
	useToast,
} from '@chakra-ui/react';
import TextInput from '../components/common/inputs/TextInput';
import { useResetPasswordError } from '../hooks/hooks';
import { ChangePasswordInput } from '../lib/types';
import { useResetUserPassword } from '../hooks/mutations/useResetUserPassword';

interface ResetPasswordProps {
	token: string;
	login: string;
}

export default function ResetPasswordView({ token, login }: ResetPasswordProps) {
	const [userFields, serUserFields] = useState<ChangePasswordInput>({
		newPassword: '',
		confirmPassword: '',
	});
	const { newPassword, confirmPassword } = userFields;
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');
	const {
		resetUserPasswordMutation,
		results: { loading: submitLoading },
	} = useResetUserPassword();

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
		serUserFields({
			...userFields,
			[e.target.name]: e.target.value,
		});
	};

	const toast = useToast();
	const navigate = useNavigate();

	const errorMessage = useResetPasswordError(errorCode);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!token || !login || !newPassword || !passwordsMatch) return;

		resetUserPasswordMutation({ key: token, login, password: newPassword })
			.then(() => {
				toast({
					title: 'Success!',
					description: 'Please login with your new password.',
					status: 'success',
					duration: 5000,
					isClosable: true,
					position: 'top',
				});
			})
			.then(() => {
				navigate('/login');
			})
			.catch((errors: { message: SetStateAction<string> }) => setErrorCode(errors.message));
	};

	const passwordsMatchError = () => {
		return passwordsMatch || (!passwordsMatch && (!newPassword || !confirmPassword))
			? ''
			: 'Passwords do not match';
	};

	return (
		<Container bg='whigreenpha.500' borderRadius='lg' w='full'>
			<Heading size='lg'>Choose your new password.</Heading>

			<Box mt={2}>
				<form onSubmit={handleSubmit}>
					<Stack direction='row' spacing={6}>
						<TextInput
							value={newPassword}
							name='newPassword'
							id='newPassword'
							variant='filled'
							label='Password'
							isRequired
							onChange={handleInputChange}
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
							label='Confirm your password'
							isRequired
							error={passwordsMatchError()}
							onChange={handleInputChange}
							inputProps={{
								type: 'password',
								autoComplete: 'new-password',
							}}
						/>
					</Stack>
					<Box mt={4}>
						<Button type='submit' colorScheme='orange' isDisabled={!formIsValid || submitLoading}>
							{submitLoading ? <Spinner size='sm' /> : 'Reset password'}
						</Button>
						<FormErrorMessage mt={0}>{errorMessage}</FormErrorMessage>
					</Box>
				</form>
			</Box>
		</Container>
	);
}
