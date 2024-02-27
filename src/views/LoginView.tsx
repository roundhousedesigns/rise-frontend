import { ChangeEvent, FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
	Button,
	Flex,
	Heading,
	Link,
	Text,
	Divider,
	Alert,
	Box,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerOverlay,
	useDisclosure,
	IconButton,
	ButtonGroup,
	Icon,
	DrawerFooter,
	Highlight,
	Stack,
} from '@chakra-ui/react';
import { FiExternalLink, FiX } from 'react-icons/fi';
import { decodeString, handleReCaptchaVerify } from '@lib/utils';
import { LoginInput } from '@lib/types';
import ContentView from '@views/ContentView';
import { useErrorMessage } from '@hooks/hooks';
import useLogin from '@hooks/mutations/useLogin';
import TextInput from '@common/inputs/TextInput';
import TargetIcon from '@common/icons/TargetIcon';

interface Props {
	alert?: string;
	alertStatus?: string;
	signInTitle?: boolean;
}

export default function LoginView({ alert, alertStatus, signInTitle }: Props) {
	const [credentials, setCredentials] = useState<LoginInput>({
		login: '',
		password: '',
		reCaptchaToken: '',
	});
	const [errorCode, setErrorCode] = useState<string>('');

	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		loginMutation,
		results: { loading: submitLoading },
	} = useLogin();
	const { executeRecaptcha } = useGoogleReCaptcha();
	const navigate = useNavigate();

	const errorMessage = useErrorMessage(errorCode);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const handleLoginSubmit = (e: FormEvent) => {
		e.preventDefault();

		handleReCaptchaVerify({ label: 'login', executeRecaptcha })
			.then((token) => {
				if (!token) {
					setErrorCode('recaptcha_error');
					return;
				}

				loginMutation({ ...credentials, reCaptchaToken: token })
					.then((res) => {
						if (res.data.loginWithCookiesAndReCaptcha.status === 'SUCCESS') {
							navigate('/');
						}
					})
					.catch((errors: { message: string }) => {
						setErrorCode(errors.message);
					});
			})
			.catch(() => {
				setErrorCode('recaptcha_error');
			});
	};

	const sanitizedAlertStatus = alertStatus === 'error' ? 'error' : 'success';

	return (
		<>
			<Box px={0}>
				<Flex alignItems='center' gap={8} flexWrap='wrap'>
					<Box flex='1'>
						<Box maxWidth='md'>
							{signInTitle ? (
								<Heading variant='pageTitle' as='h1' my={0} lineHeight='normal'>
									Sign in to RISE
								</Heading>
							) : (
								false
							)}
							<Text fontSize='lg'>
								You'll need an account to create a profile or to search for candidates.
							</Text>
							<Divider my={4} />
							<Box flex='1 1 auto'>
								{alert ? <Alert status={sanitizedAlertStatus}>{alert}</Alert> : false}
								<form onSubmit={handleLoginSubmit}>
									<TextInput
										value={credentials.login}
										name='login'
										label='Email'
										autoComplete='username'
										isRequired
										onChange={handleInputChange}
										error={
											['invalid_username', 'invalid_email', 'invalid_account'].includes(errorCode)
												? errorMessage
												: ''
										}
										inputProps={{
											autoComplete: 'username',
											fontSize: 'lg',
										}}
									/>
									<TextInput
										value={credentials.password}
										name='password'
										label='Password'
										isRequired
										onChange={handleInputChange}
										error={errorCode === 'incorrect_password' ? errorMessage : ''}
										inputProps={{
											type: 'password',
											autoComplete: 'current-password',
											fontSize: 'lg',
										}}
									/>
									<Flex
										gap={4}
										alignItems='center'
										justifyContent='space-between'
										mt={4}
										flexWrap='wrap'
									>
										<Button type='submit' colorScheme='blue' px={6} isLoading={!!submitLoading}>
											Submit
										</Button>
										<Link as={RouterLink} to='/lost-password' fontSize='sm'>
											Lost your password?
										</Link>
									</Flex>
									<Box id='recaptcha-badge' />
									<Divider />
									<Box textAlign='center' flex='1'>
										<Heading variant='pageSubtitle' fontSize='xl'>
											Don't have an account?
										</Heading>
										<Button
											as={RouterLink}
											to='/register'
											borderRadius={{ base: 'md', md: 'lg' }}
											colorScheme='green'
											color='text.dark'
											size='lg'
										>
											Sign Up
										</Button>
									</Box>
								</form>
							</Box>
						</Box>
					</Box>
					<Box textAlign='center' flex='1'>
						<Stack alignItems='center' gap={6}>
							<Heading as='h2' my={0} fontSize='3xl'>
								<Highlight query={['project']} styles={{ bg: 'blue.200' }}>
									{`Find your next project, `}
								</Highlight>
								<br />
								<Highlight query={['team']} styles={{ bg: 'green.200' }}>
									{`discover your next team`}
								</Highlight>
								.
							</Heading>
							<TargetIcon />
							<Button onClick={onOpen} size='xxl' colorScheme='yellow' mt={4}>
								{`What is RISE? ${decodeString('&raquo;')}`}
							</Button>
						</Stack>
					</Box>
				</Flex>
			</Box>
			<Drawer
				placement='right'
				size={{ base: 'full', md: 'md' }}
				onClose={onClose}
				onEsc={onClose}
				isOpen={isOpen}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerBody>
						<Box py={4} textAlign='center'>
							<ContentView postId='12238' mt={0} pt={0} />
						</Box>
					</DrawerBody>
					<DrawerFooter
						borderTopWidth='2px'
						_light={{
							borderTopColor: 'text.dark',
						}}
						_dark={{
							borderTopColor: 'text.light',
						}}
					>
						<ButtonGroup
							size='lg'
							textAlign='center'
							justifyContent='space-between'
							alignItems='center'
							w='full'
						>
							<IconButton onClick={onClose} icon={<FiX />} aria-label='Close'></IconButton>
							<Button
								as={Link}
								href='https://risetheatre.org'
								isExternal
								colorScheme='yellow'
								mt={2}
							>
								Learn about RISE Theatre{' '}
								<Icon as={FiExternalLink} aria-label='external link' pl={1} />
							</Button>
						</ButtonGroup>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
