import { Link as RouterLink } from 'react-router-dom';
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
	Icon,
	Highlight,
	Stack,
	useMediaQuery,
	DrawerHeader,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiExternalLink, FiX } from 'react-icons/fi';
import { decodeString, handleReCaptchaVerify } from '@lib/utils';
import { LoginInput } from '@lib/types';
import ContentView from '@views/ContentView';
import useLogin from '@mutations/useLogin';
import TextInput from '@common/inputs/TextInput';

interface Props {
	alert?: string;
	alertStatus?: string;
	signInTitle?: boolean;
}

const validationSchema = Yup.object().shape({
	login: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required'),
});

export default function LoginView({ alert, alertStatus, signInTitle }: Props) {
	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		loginMutation,
		results: { loading: submitLoading },
	} = useLogin();
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleLoginSubmit = async (
		values: LoginInput,
		{
			setSubmitting,
			setFieldError,
		}: {
			setSubmitting: (isSubmitting: boolean) => void;
			setFieldError: (field: string, message: string) => void;
		}
	) => {
		try {
			const token = await handleReCaptchaVerify({ label: 'login', executeRecaptcha });
			if (!token) {
				setFieldError('login', 'ReCAPTCHA verification failed. Please try again.');
				setSubmitting(false);
				return;
			}

			await loginMutation({ ...values, reCaptchaToken: token });
		} catch (error: any) {
			if (
				error.message === 'invalid_username' ||
				error.message === 'invalid_email' ||
				error.message === 'invalid_account'
			) {
				setFieldError('login', 'Invalid email or account');
			} else if (error.message === 'incorrect_password') {
				setFieldError('password', 'Incorrect password');
			} else {
				setFieldError('login', 'An error occurred. Please try again.');
			}
		}
		setSubmitting(false);
	};

	const sanitizedAlertStatus = alertStatus === 'error' ? 'error' : 'success';

	return (
		<>
			<Box>
				<Flex alignItems={'center'} gap={8} flexWrap={'wrap'}>
					<Box flex={'1'}>
						<Box maxWidth={'md'}>
							{signInTitle && (
								<Heading variant={'pageTitle'} as={'h1'} my={0} lineHeight={'normal'}>
									Sign in to RISE
								</Heading>
							)}
							<Text fontSize={'lg'}>
								You'll need an account to create a profile or to search for candidates.
							</Text>
							<Divider my={4} />
							<Box flex={'1 1 auto'}>
								{alert && <Alert status={sanitizedAlertStatus}>{alert}</Alert>}
								<Formik
									initialValues={{
										login: '',
										password: '',
										reCaptchaToken: '',
									}}
									validationSchema={validationSchema}
									onSubmit={handleLoginSubmit}
								>
									{({ isSubmitting, errors, touched }) => (
										<Form>
											<Field name='login'>
												{({ field }: any) => (
													<TextInput
														{...field}
														label={'Email'}
														autoComplete={'username'}
														isRequired
														error={touched.login && errors.login}
														inputProps={{
															autoComplete: 'username',
															fontSize: 'lg',
														}}
													/>
												)}
											</Field>
											<Field name='password'>
												{({ field }: any) => (
													<TextInput
														{...field}
														label={'Password'}
														isRequired
														error={touched.password && errors.password}
														inputProps={{
															type: 'password',
															autoComplete: 'current-password',
															fontSize: 'lg',
														}}
													/>
												)}
											</Field>
											<Flex
												gap={4}
												alignItems={'center'}
												justifyContent={'space-between'}
												mt={4}
												flexWrap={'wrap'}
											>
												<Button
													type={'submit'}
													colorScheme={'blue'}
													px={6}
													isLoading={isSubmitting || submitLoading}
												>
													Sign In
												</Button>
												<Link as={RouterLink} to={'/lost-password'} fontSize={'sm'}>
													Lost your password?
												</Link>
											</Flex>
											<Box id={'recaptcha-badge'} />
										</Form>
									)}
								</Formik>
								<Divider />
								<Box textAlign={'center'} flex={'1'}>
									<Heading variant={'pageSubtitle'} fontSize={'xl'}>
										Don't have an account?
									</Heading>
									<Button
										as={RouterLink}
										to={'/register'}
										borderRadius={{ base: 'md', md: 'lg' }}
										colorScheme={'green'}
										color={'text.dark'}
										size={'lg'}
									>
										Join Now
									</Button>
								</Box>
							</Box>
						</Box>
					</Box>
					{!isLargerThanMd && <Divider my={0} />}
					<Box textAlign={'center'} flex={'1'} pb={2}>
						<Stack textAlign={'center'} gap={6}>
							<Heading as={'h2'} my={0} fontSize={{ base: '2xl', md: '3xl' }}>
								<Highlight query={['project']} styles={{ bg: 'blue.200' }}>
									Find your next project
								</Highlight>
								<br />
								<Highlight query={['team']} styles={{ bg: 'green.200' }}>
									Discover your next team
								</Highlight>
							</Heading>
							<Box>
								<Button onClick={onOpen} size={'xxl'} colorScheme={'yellow'}>
									{`What is RISE? ${decodeString('&raquo;')}`}
								</Button>
							</Box>
						</Stack>
					</Box>
				</Flex>
			</Box>
			<Drawer
				placement={'right'}
				size={{ base: 'full', md: 'md' }}
				onClose={onClose}
				closeOnEsc={true}
				isOpen={isOpen}
				isFullHeight={false}
			>
				<DrawerOverlay />
				<DrawerContent display={'flex'} flexDirection={'column'} height={'100%'}>
					<DrawerHeader pt={2} pb={1} px={2} textAlign={'right'}>
						<IconButton
							onClick={onClose}
							borderRadius={'full'}
							fontSize={'xl'}
							icon={<FiX />}
							aria-label={'Close'}
						/>
					</DrawerHeader>
					<DrawerBody py={0} pb={2}>
						<Box textAlign={'center'}>
							<ContentView postId={'12238'} mt={0} pt={0} />
							<Button
								as={Link}
								href={'https://risetheatre.org'}
								isExternal
								colorScheme={'yellow'}
								size={'lg'}
								mt={6}
								mb={24}
							>
								Learn about RISE Theatre{' '}
								<Icon as={FiExternalLink} aria-label={'external link'} pl={1} />
							</Button>
						</Box>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
