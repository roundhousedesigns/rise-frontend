import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	Button,
	Box,
	Spinner,
	Flex,
	useClipboard,
	useToast,
	Heading,
	useMediaQuery,
} from '@chakra-ui/react';
import { useErrorMessage, useProfileUrl, useValidateProfileSlug } from '../hooks/hooks';
import useViewer from '../hooks/queries/useViewer';
import useChangeProfileSlug from '../hooks/mutations/useChangeProfileSlug';
import TextInput from '../components/common/inputs/TextInput';
import { FiCheck, FiClipboard } from 'react-icons/fi';

export default function ChangeProfileUrlView() {
	const { loggedInId: userId, loggedInSlug } = useViewer();

	const [slug, setSlug] = useState<string>('');
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');
	const { onCopy, setValue: setCopyValue, hasCopied } = useClipboard('');

	const profileUrl = useProfileUrl(loggedInSlug);
	const toast = useToast();

	const {
		changeProfileSlugMutation,
		results: { loading: submitLoading },
	} = useChangeProfileSlug();

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const newSlugIsClean = useValidateProfileSlug(slug);
	const errorMessage = useErrorMessage(errorCode);

	const hasEditedSlug = slug !== loggedInSlug;

	// Whenever the loggedInSlug changes, update slug
	useEffect(() => {
		setSlug(loggedInSlug);
	}, [loggedInSlug]);

	// Check if form is valid
	useEffect(() => {
		if (!slug) return;

		if (!newSlugIsClean) {
			setErrorCode('user_slug_invalid');
			setFormIsValid(false);
			return;
		}

		setFormIsValid(true);
		setErrorCode('');

		return () => {
			setFormIsValid(false);
		};
	}, [slug]);

	// Set the copy value to the profile URL
	useEffect(() => {
		setCopyValue(profileUrl);
	}, [profileUrl]);

	// Pop up the toast when the user copies the URL
	useEffect(() => {
		if (hasCopied) {
			toast({
				title: 'Copied!',
				position: 'top',
				description: 'Your profile link has been copied to your clipboard.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		}
	}, [hasCopied]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSlug(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!loggedInSlug || !slug) return;

		changeProfileSlugMutation(userId, slug)
			.then((res) => {
				setSlug(res.data.changeProfileSlug.slug);

				// toast success
				toast({
					title: 'Bookmarked!',
					position: 'top',
					description: 'Your profile link has been updated.',
					status: 'success',
					duration: 3000,
					isClosable: true,
				});

				setErrorCode('');
			})
			.catch((errors: { message: string }) => setErrorCode(errors.message));
	};

	return (
		<Box borderRadius='lg' w='full'>
			<Heading variant='contentSubtitle'>Customize your profile's URL for easy sharing.</Heading>
			<Flex mt={6} gap={4} alignItems='flex-start' flexWrap='wrap' justifyContent='space-between'>
				<Box flex='1 1 auto'>
					<form onSubmit={handleSubmit}>
						<Heading variant='contentSubtitle' mt={0}>
							Your profile tag:
						</Heading>
						<TextInput
							value={slug}
							name='slug'
							id='slug'
							maxW='320px'
							label='New profile tag'
							labelHidden
							helperText='Letters, numbers, - and _ only.'
							error={errorMessage}
							isRequired
							maxLength={20}
							onChange={handleInputChange}
							flex='1'
						/>

						<Box mt={4}>
							<Button
								type='submit'
								colorScheme='green'
								isDisabled={!formIsValid || submitLoading || !hasEditedSlug}
							>
								{submitLoading ? <Spinner size='sm' /> : 'Save'}
							</Button>
							<Button
								ml={2}
								colorScheme='orange'
								isDisabled={!hasEditedSlug}
								onClick={() => setSlug(loggedInSlug)}
							>
								Cancel
							</Button>
						</Box>
					</form>
				</Box>

				<Box opacity={hasEditedSlug ? 0.5 : 1} transition='opacity 300ms ease' flex='1 1 auto'>
					<Heading variant='contentSubtitle' mt={0}>
						Your profile link:
					</Heading>
					<Button
						mt={0}
						isDisabled={!!hasEditedSlug}
						title='Copy profile URL'
						colorScheme='yellow'
						leftIcon={hasCopied ? <FiCheck /> : <FiClipboard />}
						onClick={onCopy}
						maxW='100%'
						overflow='hidden'
					>
						{isLargerThanMd ? profileUrl : 'Copy'}
					</Button>
				</Box>
			</Flex>
		</Box>
	);
}
