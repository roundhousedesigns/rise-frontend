import { ChangeEvent, FormEvent, useState } from 'react';
import { chakra, Button, Flex, Box, Text, Link, Divider, useToast } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useChangeUserEmail from '@hooks/mutations/useChangeUserEmail';
import TextInput from '@common/inputs/TextInput';
import useViewer from '@hooks/queries/useViewer';

export default function ChangeEmailView() {
	const { username, email: userEmail } = useViewer();

	const [newEmail, setNewEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');
	const { changeUserEmailMutation } = useChangeUserEmail();

	const toast = useToast();

	/**
	 * Email validation.
	 *
	 * @param email
	 * @returns
	 */
	const validateEmail = (email: string) => {
		// Don't set an identical email address.
		const errorCode = [];

		if (email.toLocaleLowerCase() === userEmail.toLocaleLowerCase()) {
			errorCode.push('This is your current email address.');
		}

		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (re.test(String(email).toLowerCase()) === false) {
			errorCode.push('Please enter a valid email address.');
		}

		setErrorCode(errorCode.join('; '));

		// If any errors were set, the email isn't valid.
		return errorCode.length === 0 ? true : false;
	};

	const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const email = e.target.value;
		setNewEmail(email);

		setEmailIsValid(validateEmail(email));
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

				toast({
					title: 'Updated!',
					position: 'top',
					description: 'Your new email address has been set.',
					status: 'success',
					duration: 1500,
					isClosable: true,
					onCloseComplete: () => {
						// HACK Figure out how to close the modal, when that's how this
						// 			component is called.
						window.location.reload();
					},
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
						error={errorCode ? errorCode : ''}
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
