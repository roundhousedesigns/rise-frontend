import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	Button,
	Box,
	Flex,
	Text,
	useClipboard,
	useToast,
	Heading,
	chakra,
} from '@chakra-ui/react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { useErrorMessage, useProfileUrl, useValidateProfileSlug } from '@hooks/hooks';
import useViewer from '@queries/useViewer';
import useChangeProfileSlug from '@mutations/useChangeProfileSlug';
import TextInput from '@common/inputs/TextInput';

export default function ChangeProfileUrlView() {
	const [{ loggedInId: userId, loggedInSlug }] = useViewer();

	const [slug, setSlug] = useState<string>(loggedInSlug);
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
	const [errorCode, setErrorCode] = useState<string>('');
	const { onCopy, setValue: setCopyValue, hasCopied } = useClipboard('');

	const profileUrl = useProfileUrl(loggedInSlug);
	const toast = useToast();

	const {
		changeProfileSlugMutation,
		results: { loading: submitLoading },
	} = useChangeProfileSlug();

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

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSlug(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!loggedInSlug || !slug) return;

		changeProfileSlugMutation(userId, slug)
			.then((res) => {
				setSlug(res.data.changeProfileSlug.slug);

				toast({
					title: 'Updated!',
					position: 'bottom',
					description: 'Your handle has been updated.',
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
			<Flex
				gap={{ base: 0, md: 4 }}
				alignItems='center'
				flexWrap='wrap'
				justifyContent={'space-between'}
			>
				<Box>
					<chakra.form onSubmit={handleSubmit}>
						<Heading variant='contentSubtitle'>Profile handle</Heading>
						<Text fontSize='sm' lineHeight='shorter'>
							Give yourself a memorable handle to make sharing your profile easy.
						</Text>
						<Flex gap={2} flexWrap='wrap' w='100%' alignItems={'flex-start'}>
							<TextInput
								value={slug}
								name='slug'
								id='slug'
								maxW='300px'
								mt={0}
								label={'New profile tag'}
								labelHidden
								helperText={'Letters, numbers, dashes, and underscores.'}
								error={errorMessage}
								isRequired
								maxLength={20}
								onChange={handleInputChange}
								inputProps={{
									pl: 2,
								}}
								flex='1'
							/>
							<Button
								type='submit'
								colorScheme='green'
								isDisabled={!formIsValid || submitLoading || !hasEditedSlug}
								isLoading={submitLoading}
							>
								Save
							</Button>
						</Flex>
					</chakra.form>
				</Box>
				<Box flex='auto' fontSize='sm'>
					<Box opacity={hasEditedSlug ? 0.8 : 1}>
						<Button
							leftIcon={hasCopied ? <FiCheck /> : <FiCopy />}
							title='Copy'
							onClick={onCopy}
							size='sm'
							aria-label='Copy profile URL'
							isDisabled={!!hasEditedSlug}
							maxW={'100%'}
							overflow='hidden'
							colorScheme='yellow'
						>
							{profileUrl}
						</Button>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
}
