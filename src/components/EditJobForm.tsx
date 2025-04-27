import { useState, useEffect } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
	useToast,
	Wrap,
	Flex,
} from '@chakra-ui/react';
import { JobPostOutput } from '@lib/types';
import useUpdateJobPost from '@mutations/useUpdateJobPost';
import CheckboxButton from './common/inputs/CheckboxButton';
import { useNavigate } from 'react-router-dom';

interface EditJobFormProps {
	initialData?: JobPostOutput;
}

export default function EditJobForm({ initialData }: EditJobFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const toast = useToast();
	const { updateJobPostMutation } = useUpdateJobPost();

	const navigate = useNavigate();

	const [formData, setFormData] = useState<JobPostOutput>({
		title: '',
		companyName: '',
		companyAddress: '',
		contactName: '',
		contactEmail: '',
		contactPhone: '',
		description: '',
		startDate: '',
		endDate: '',
		instructions: '',
		compensation: '',
		applicationUrl: '',
		applicationPhone: '',
		applicationEmail: '',
		isPaid: false,
		isInternship: false,
		isUnion: false,
	});

	useEffect(() => {
		if (initialData) {
			// Format dates to YYYY-MM-DD for date inputs
			const formattedData = {
				...initialData,
				startDate: initialData.startDate
					? new Date(initialData.startDate).toISOString().split('T')[0]
					: '',
				endDate: initialData.endDate
					? new Date(initialData.endDate).toISOString().split('T')[0]
					: '',
			};
			setFormData(formattedData);
		}
	}, [initialData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		if (type === 'checkbox') {
			setFormData((prev) => ({
				...prev,
				[name]: (e.target as HTMLInputElement).checked,
			}));
		} else if (type === 'date') {
			// Ensure date is in YYYY-MM-DD format
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Clean up the data before sending to mutation
		const cleanData = {
			id: formData.id,
			author: formData.author,
			title: formData.title,
			companyName: formData.companyName,
			companyAddress: formData.companyAddress,
			contactName: formData.contactName,
			contactEmail: formData.contactEmail,
			contactPhone: formData.contactPhone,
			startDate: formData.startDate,
			endDate: formData.endDate,
			instructions: formData.instructions,
			compensation: formData.compensation,
			applicationUrl: formData.applicationUrl,
			applicationPhone: formData.applicationPhone,
			applicationEmail: formData.applicationEmail,
			description: formData.description,
			isPaid: formData.isPaid,
			isInternship: formData.isInternship,
			isUnion: formData.isUnion,
		};

		updateJobPostMutation(cleanData)
			.then((response) => {
				if (response.data?.updateOrCreateJobPost?.jobPost) {
					toast({
						title: 'Success',
						description: initialData ? 'Job updated successfully' : 'Job created successfully',
						status: 'success',
						duration: 3000,
						isClosable: true,
					});

					// Navigate to the job management page
					navigate('/jobs/manage');
				} else {
					throw new Error('Failed to save job post');
				}
			})
			.catch((error) => {
				toast({
					title: 'Error',
					description:
						error instanceof Error ? error.message : 'Something went wrong. Please try again.',
					status: 'error',
					duration: 3000,
					isClosable: true,
				});
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	return (
		<Box as='form' onSubmit={handleSubmit} width='100%'>
			<VStack spacing={4} align='stretch'>
				<FormControl isRequired>
					<FormLabel>Job Title</FormLabel>
					<Input
						name='title'
						value={formData.title}
						onChange={handleChange}
						placeholder='Enter job title'
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Company Name</FormLabel>
					<Input
						name='companyName'
						value={formData.companyName}
						onChange={handleChange}
						placeholder='Enter company name'
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Company Address</FormLabel>
					<Textarea
						name='companyAddress'
						value={formData.companyAddress}
						onChange={handleChange}
						placeholder='Enter company address'
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Contact Name</FormLabel>
					<Input
						name='contactName'
						value={formData.contactName}
						onChange={handleChange}
						placeholder='Enter contact name'
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Contact Email</FormLabel>
					<Input
						name='contactEmail'
						type='email'
						value={formData.contactEmail}
						onChange={handleChange}
						placeholder='Enter contact email'
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Contact Phone</FormLabel>
					<Input
						name='contactPhone'
						value={formData.contactPhone || ''}
						onChange={handleChange}
						placeholder='Enter contact phone'
					/>
				</FormControl>

				<Flex gap={4} flexWrap='wrap'>
					<FormControl isRequired>
						<FormLabel>Start Date</FormLabel>
						<Input
							name='startDate'
							type='date'
							value={formData.startDate}
							onChange={handleChange}
						/>
					</FormControl>

					<FormControl>
						<FormLabel>End Date (optional)</FormLabel>
						<Input
							name='endDate'
							type='date'
							value={formData.endDate || ''}
							onChange={handleChange}
						/>
					</FormControl>
				</Flex>

				<FormControl isRequired>
					<FormLabel>Description</FormLabel>
					<Textarea
						name='description'
						value={formData.description || ''}
						onChange={handleChange}
						placeholder='Enter job description'
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Instructions</FormLabel>
					<Textarea
						name='instructions'
						value={formData.instructions}
						onChange={handleChange}
						placeholder='Enter application instructions'
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Compensation</FormLabel>
					<Input
						name='compensation'
						value={formData.compensation || ''}
						onChange={handleChange}
						placeholder='Enter compensation details'
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Application URL</FormLabel>
					<Input
						name='applicationUrl'
						type='url'
						value={formData.applicationUrl || ''}
						onChange={handleChange}
						placeholder='Enter application URL'
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Application Phone</FormLabel>
					<Input
						name='applicationPhone'
						value={formData.applicationPhone || ''}
						onChange={handleChange}
						placeholder='Enter application phone'
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Application Email</FormLabel>
					<Input
						name='applicationEmail'
						type='email'
						value={formData.applicationEmail || ''}
						onChange={handleChange}
						placeholder='Enter application email'
					/>
				</FormControl>

				<Wrap>
					<FormControl>
						<CheckboxButton
							name='isPaid'
							value={formData.isPaid ? 'true' : 'false'}
							onChange={handleChange}
						>
							This is a paid position
						</CheckboxButton>
					</FormControl>

					<FormControl>
						<CheckboxButton
							name='isInternship'
							value={formData.isInternship ? 'true' : 'false'}
							onChange={handleChange}
						>
							This is an internship position
						</CheckboxButton>
					</FormControl>

					<FormControl>
						<CheckboxButton
							name='isUnion'
							value={formData.isUnion ? 'true' : 'false'}
							onChange={handleChange}
						>
							This is a union position
						</CheckboxButton>
					</FormControl>
				</Wrap>

				<Button
					type='submit'
					colorScheme='blue'
					isLoading={isSubmitting}
					loadingText='Submitting...'
				>
					{initialData ? 'Update Job' : 'Create Job'}
				</Button>
			</VStack>
		</Box>
	);
}
