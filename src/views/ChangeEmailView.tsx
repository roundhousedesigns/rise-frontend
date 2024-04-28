import { ChangeEvent, FormEvent, useState } from 'react';
import { chakra, Button, Flex, Box, Text, Link, Divider, useToast } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useChangeUserEmail from '@hooks/mutations/useChangeUserEmail';
import TextInput from '@common/inputs/TextInput';
import useViewer from '@hooks/queries/useViewer';

export default function ChangeEmailView() {
	const { username } = useViewer();

	const [newEmail, setNewEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');
	const { changeUserEmailMutation } = useChangeUserEmail();

	const toast = useToast();

	const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const email = e.target.value;
		setNewEmail(email);
		setEmailIsValid(!!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)); // Basic email validation
	};

	const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!emailIsValid || !password) return;

		setSubmitLoading(true);
		changeUserEmailMutation(username, newEmail, password)
			.then(() => {
				setNewEmail('');
				setErrorCode('');

				window.location.reload();

				toast({
					title: 'Updated!',
					position: 'top',
					description: 'Your new email address has been set.',
					status: 'success',
					duration: 3000,
					isClosable: true,
				});
			})
			.catch((error: { message: string }) => {
				setErrorCode(error.message);
			})
			.finally(() => {
				setSubmitLoading(false);
			});
	};

	return (
		<>
			<Text variant='notice' fontStyle='italic' mb={4} fontSize='sm'>
				Your account email is the address we use to communicate with you. If you'd like, you may use
				a different email publicly by{' '}
				<Link as={RouterLink} to='/profile/edit'>
					editing your profile
				</Link>
				.
			</Text>
			<Divider />
			<chakra.form onSubmit={handleSubmit} mt={3} w='full'>
				<Flex gap={6} flexWrap='wrap'>
					<TextInput
						value={newEmail}
						name='newEmail'
						id='newEmail'
						variant='filled'
						label='New email address'
						isRequired
						flex='1'
						onChange={handleEmailInputChange}
						error={errorCode ? `Error: ${errorCode}` : ''}
						inputProps={{
							type: 'email',
							autoComplete: 'email',
						}}
					/>
					<TextInput
						value={password}
						name='password'
						id='password'
						variant='filled'
						label='Your password'
						isRequired
						flex='1'
						onChange={handlePasswordInputChange}
						error={errorCode ? `Error: ${errorCode}` : ''}
						inputProps={{
							type: 'password',
						}}
					/>
				</Flex>
				<Box mt={2}>
					<Button
						type='submit'
						colorScheme='orange'
						isDisabled={!emailIsValid || !password || submitLoading}
						isLoading={submitLoading}
					>
						Update Email
					</Button>
				</Box>
			</chakra.form>
		</>
	);
}
