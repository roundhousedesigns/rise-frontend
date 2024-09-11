import { useEffect } from 'react';
import { Button, Box, Flex, Text, useClipboard, useToast, Heading, Wrap } from '@chakra-ui/react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { Formik, Form, Field, FieldInputProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useProfileUrl, useValidateProfileSlug } from '@hooks/hooks';
import useViewer from '@queries/useViewer';
import useChangeProfileSlug from '@mutations/useChangeProfileSlug';
import TextInput from '@common/inputs/TextInput';

const validationSchema = Yup.object().shape({
	slug: Yup.string()
		.matches(/^[a-zA-Z0-9-_]+$/, 'Only letters, numbers, dashes, and underscores are allowed')
		.required('Handle is required'),
});

export default function ChangeProfileSlugView() {
	const [{ loggedInId: userId, loggedInSlug }] = useViewer();

	const { onCopy, setValue: setCopyValue, hasCopied } = useClipboard('');

	const profileUrl = useProfileUrl(loggedInSlug);
	const toast = useToast();

	const {
		changeProfileSlugMutation,
		results: { loading: submitLoading },
	} = useChangeProfileSlug();

	const newSlugIsClean = useValidateProfileSlug;

	// Set the copy value to the profile URL
	useEffect(() => {
		setCopyValue(profileUrl);
	}, [profileUrl, setCopyValue]);

	const handleSubmit = async (
		values: { slug: string },
		{ setSubmitting, setFieldError }: FormikHelpers<{ slug: string }>
	) => {
		if (!loggedInSlug || !values.slug) return;

		if (!newSlugIsClean(values.slug)) {
			setFieldError('slug', 'Invalid handle');
			setSubmitting(false);
			return;
		}

		try {
			await changeProfileSlugMutation(userId, values.slug);
			toast({
				title: 'Updated!',
				position: 'bottom',
				description: 'Your handle has been updated.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		} catch (error: any) {
			setFieldError('slug', error.message);
		}
		setSubmitting(false);
	};

	return (
		<Box borderRadius={'lg'} w={'full'}>
			<Flex mt={2} gap={8} alignItems={'center'} flexWrap={'wrap'} justifyContent={'space-between'}>
				<Box flex={'1 0 auto'}>
					<Formik
						initialValues={{
							slug: loggedInSlug,
						}}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{({ isValid, dirty, isSubmitting, errors, touched, setValues }) => (
							<Form>
								<Heading variant={'contentSubtitle'}>Handle</Heading>
								<Text>Give yourself a memorable handle to make sharing your profile easy.</Text>
								<Wrap>
									<Field name='slug'>
										{({ field }: { field: FieldInputProps<string> }) => (
											<TextInput
												{...field}
												maxW={'300px'}
												label={'New profile tag'}
												labelHidden
												helperText={'Letters, numbers, dashes, and underscores.'}
												my={0}
												error={touched.slug && errors.slug}
												isRequired
												maxLength={20}
												inputProps={{
													pl: 2,
												}}
												flex={'1'}
											/>
										)}
									</Field>
									<Button
										type={'submit'}
										colorScheme={'green'}
										isDisabled={!isValid || !dirty || isSubmitting}
										isLoading={isSubmitting}
									>
										Save
									</Button>
									<Button
										colorScheme={'red'}
										isDisabled={!dirty}
										onClick={() => {
											setValues({ slug: loggedInSlug });
										}}
									>
										Cancel
									</Button>
								</Wrap>
								<Box flex={'auto'}>
									<Text fontSize={'sm'}>
										{dirty
											? 'Save your changes to update your profile URL.'
											: 'Your current profile URL is:'}
									</Text>
									<Box opacity={dirty ? 0.8 : 1}>
										<Button
											leftIcon={hasCopied ? <FiCheck /> : <FiCopy />}
											title={'Copy profile URL'}
											onClick={onCopy}
											isDisabled={!!dirty}
											maxW={'100%'}
											colorScheme={'yellow'}
											overflow={'hidden'}
										>
											{profileUrl}
										</Button>
									</Box>
								</Box>
							</Form>
						)}
					</Formik>
				</Box>
			</Flex>
		</Box>
	);
}
