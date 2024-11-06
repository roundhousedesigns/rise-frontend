import { memo, useEffect, useState } from 'react';
import {
	Divider,
	Flex,
	Heading,
	Text,
	Spinner,
	Stack,
	useToast,
	ButtonGroup,
	Box,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldInputProps, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { CreditParams } from '@lib/types';
import { Credit, WPItem } from '@lib/classes';
import { sortWPItemsByName } from '@lib/utils';
import { FiCheck, FiX } from 'react-icons/fi';
import usePositions from '@queries/usePositions';
import useLazyPositions from '@queries/useLazyPositions';
import useLazyRelatedSkills from '@queries/useLazyRelatedSkills';
import useViewer from '@queries/useViewer';
import useUpdateCredit from '@mutations/useUpdateCredit';
import ProfileCheckboxGroup from '@common/inputs/ProfileCheckboxGroup';
import TextInput from '@common/inputs/TextInput';
import RequiredAsterisk from '@common/RequiredAsterisk';
import ProfileRadioGroup from '@common/inputs/ProfileRadioGroup';
import TooltipIconButton from '../components/common/inputs/TooltipIconButton';

interface Props {
	credit: Credit;
	onClose: () => void;
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required('Company/Production Name is required'),
	jobTitle: Yup.string().required('Job/Position Title is required'),
	jobLocation: Yup.string().required('Job Location is required'),
	venue: Yup.string().required('Venue is required'),
	workStart: Yup.string().required('Start year is required'),
	workEnd: Yup.string().when('workCurrent', {
		is: false,
		then: (schema) => schema.required('End year is required'),
	}),
	positions: Yup.object().shape({
		departments: Yup.array().min(1, 'At least one department is required'),
		jobs: Yup.array().min(1, 'At least one job is required'),
	}),
});

export default function EditCreditView({ credit, onClose: closeModal }: Props) {
	const [{ loggedInId }] = useViewer();

	const toast = useToast();

	const { updateCreditMutation } = useUpdateCredit();

	const [allDepartments] = usePositions();
	const [getJobs, { loading: jobsLoading }] = useLazyPositions();
	const [jobs, setJobs] = useState<WPItem[]>([]);
	const [getRelatedSkills, { loading: relatedSkillsLoading }] = useLazyRelatedSkills();
	const [skills, setSkills] = useState<WPItem[]>([]);

	// Fetch jobs & skills lists on mount
	useEffect(() => {
		refetchAndSetJobs(credit?.positions.departments || []);
		refetchAndSetSkills(credit?.positions.jobs || []);
	}, []);

	const refetchAndSetJobs = async (departmentIds: number[]) => {
		if (departmentIds.length === 0) {
			setJobs([]);
			return [];
		}

		const jobData = await getJobs({
			variables: { departments: departmentIds },
		});

		const jobsByDept = jobData?.data?.jobsByDepartments;

		if (jobsByDept) {
			setJobs(jobsByDept.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));
			return jobsByDept.map((j: WPItem) => Number(j.id));
		} else {
			setJobs([]);
			return [];
		}
	};

	const refetchAndSetSkills = async (jobIds: number[]) => {
		if (jobIds.length === 0) {
			setSkills([]);
			return [];
		}

		const skillData = await getRelatedSkills({
			variables: { jobs: jobIds },
		});
		const relatedSkills = skillData?.data?.jobSkills;

		if (relatedSkills) {
			setSkills(relatedSkills.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));
			return relatedSkills.map((s: WPItem) => Number(s.id));
		} else {
			setSkills([]);
			return [];
		}
	};

	const handleDepartmentChange = async (
		terms: string[],
		setFieldValue: FormikHelpers<CreditParams>['setFieldValue'],
		values: CreditParams
	) => {
		const termsAsNums = terms.map(Number);
		await setFieldValue('positions.departments', termsAsNums);
		const visibleJobs = await refetchAndSetJobs(termsAsNums);
		const filteredSelectedJobIds = values.positions.jobs.filter((id: number) =>
			visibleJobs.includes(id)
		);
		await setFieldValue('positions.jobs', filteredSelectedJobIds);
	};

	const handleJobChange = async (
		terms: string[],
		setFieldValue: FormikHelpers<CreditParams>['setFieldValue'],
		values: CreditParams
	) => {
		console.log('handleJobChange called with:', { terms, values });
		const termsAsNums = terms.map(Number);
		setFieldValue('positions.jobs', termsAsNums);
		const filteredSkills = await refetchAndSetSkills(termsAsNums);
		const filteredSelectedSkillIds = (values.skills ?? []).filter((id: number) =>
			filteredSkills.includes(id)
		);
		setFieldValue('skills', filteredSelectedSkillIds);
	};

	const handleSkillsChange = (
		terms: string[],
		setFieldValue: FormikHelpers<CreditParams>['setFieldValue'],
		values: CreditParams
	) => {
		const termsAsNums = terms.map(Number);
		setFieldValue('skills', termsAsNums);
	};

	const handleSubmit = (values: CreditParams, { setSubmitting }: FormikHelpers<CreditParams>) => {
		const creditToUpdate = new Credit(values).prepareCreditForGraphQL();
		updateCreditMutation(creditToUpdate, loggedInId)
			.then(() => {
				closeModal();
				toast({
					title: 'Saved!',
					description: 'Your credit has been saved.',
					status: 'success',
					duration: 3000,
					isClosable: true,
					position: 'bottom',
				});
			})
			.catch((err) => {
				toast({
					title: 'Oops!',
					description: 'There was an error saving this credit.',
					status: 'error',
					duration: 3000,
					isClosable: true,
					position: 'bottom',
				});

				console.error(err);
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const EditCreditButtons = memo(
		({
			isValid,
			dirty,
			isSubmitting,
		}: {
			isValid: boolean;
			dirty: boolean;
			isSubmitting: boolean;
		}) => {
			return (
				<ButtonGroup size={'md'}>
					<TooltipIconButton
						type={'submit'}
						isLoading={isSubmitting}
						icon={<FiCheck />}
						label={'Save'}
						colorScheme={'green'}
						isDisabled={!isValid || !dirty || isSubmitting}
					/>
					<TooltipIconButton
						icon={<FiX />}
						label={'Cancel changes'}
						colorScheme={'red'}
						onClick={closeModal}
						isDisabled={isSubmitting}
					/>
				</ButtonGroup>
			);
		}
	);

	return (
		<Formik
			initialValues={credit as CreditParams}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ isValid, dirty, isSubmitting, values, setFieldValue, errors, touched }) => (
				<Form>
					<Flex flex={'1'} justifyContent={'space-between'} py={2} mb={2}>
						<Heading as={'h3'} size={'lg'} lineHeight={'base'}>
							Edit Credit
						</Heading>
						<EditCreditButtons isValid={isValid} dirty={dirty} isSubmitting={isSubmitting} />
					</Flex>

					<Flex gap={4}>
						<Field name='title'>
							{({ field }: { field: FieldInputProps<string> }) => (
								<TextInput
									{...field}
									label={'Company/Production Name'}
									isRequired
									error={touched.title && errors.title}
								/>
							)}
						</Field>

						<Field name='jobTitle'>
							{({ field }: { field: FieldInputProps<string> }) => (
								<TextInput
									{...field}
									label={'Job/Position Title'}
									isRequired
									error={touched.jobTitle && errors.jobTitle}
								/>
							)}
						</Field>
					</Flex>

					<Flex justifyContent={'space-between'} w={'full'} gap={4} flexWrap={'wrap'} mt={1}>
						<Field name='workStart'>
							{({ field }: { field: FieldInputProps<string> }) => (
								<TextInput
									{...field}
									label={'Start year'}
									isRequired
									error={touched.workStart && errors.workStart}
									flex={'1'}
								/>
							)}
						</Field>

						<Field name='workEnd'>
							{({ field }: { field: FieldInputProps<string> }) => (
								<TextInput
									{...field}
									label={'End year'}
									error={touched.workEnd && errors.workEnd}
									isDisabled={values.workCurrent}
									flex={'1'}
								/>
							)}
						</Field>

						<Field name='workCurrent'>
							{({
								field,
								form,
							}: {
								field: FieldInputProps<boolean>;
								form: FormikProps<CreditParams>;
							}) => (
								<ProfileRadioGroup
									{...field}
									label={'Currently working here'}
									items={[
										{ label: 'Yes', value: 'true' },
										{ label: 'No', value: 'false' },
									]}
									defaultValue={field.value ? 'true' : 'false'}
									handleChange={(value: string) => form.setFieldValue(field.name, value === 'true')}
								/>
							)}
						</Field>
					</Flex>

					<Flex justifyContent={'space-between'} w={'full'} gap={4} flexWrap={'wrap'} mt={1}>
						<Field name='venue'>
							{({ field }: { field: FieldInputProps<string> }) => (
								<TextInput
									{...field}
									label={'Venue'}
									isRequired
									error={touched.venue && errors.venue}
									flex={'1'}
								/>
							)}
						</Field>

						<Field name='jobLocation'>
							{({ field }: { field: FieldInputProps<string> }) => (
								<TextInput
									{...field}
									label={'Job Location'}
									isRequired
									error={touched.jobLocation && errors.jobLocation}
									flex={'1'}
								/>
							)}
						</Field>
					</Flex>

					<Flex justifyContent={'flex-start'} w={'full'} gap={4} flexWrap={'wrap'} mt={1}>
						<Field name='intern'>
							{({
								field,
								form,
							}: {
								field: FieldInputProps<boolean>;
								form: FormikProps<CreditParams>;
							}) => (
								<ProfileRadioGroup
									{...field}
									label={`This ${values.workCurrent ? 'is' : 'was'} an internship`}
									items={[
										{ label: 'Yes', value: 'true' },
										{ label: 'No', value: 'false' },
									]}
									defaultValue={field.value ? 'true' : 'false'}
									handleChange={(value: string) => form.setFieldValue(field.name, value === 'true')}
								/>
							)}
						</Field>

						<Field name='fellow'>
							{({
								field,
								form,
							}: {
								field: FieldInputProps<boolean>;
								form: FormikProps<CreditParams>;
							}) => (
								<ProfileRadioGroup
									{...field}
									label={`This ${values.workCurrent ? 'is' : 'was'} a fellowship`}
									items={[
										{ label: 'Yes', value: 'true' },
										{ label: 'No', value: 'false' },
									]}
									defaultValue={field.value ? 'true' : 'false'}
									handleChange={(value: string) => form.setFieldValue(field.name, value === 'true')}
								/>
							)}
						</Field>
					</Flex>

					<Divider />

					<Stack direction={'column'} spacing={6} fontSize={'md'}>
						<Box>
							<Heading as={'h4'} variant={'contentTitle'}>
								Department
								<RequiredAsterisk fontSize={'md'} position={'relative'} top={-1} />
							</Heading>
							<Text>Select all department(s) you worked under.</Text>
							<Field name='positions.departments'>
								{({
									field,
									form,
								}: {
									field: FieldInputProps<number[]>;
									form: FormikProps<CreditParams>;
								}) => {
									return (
										<ProfileCheckboxGroup
											items={allDepartments}
											checked={field.value.map(String)}
											handleChange={async (terms: string[]) => {
												await handleDepartmentChange(terms, form.setFieldValue, form.values);
											}}
										/>
									);
								}}
							</Field>
							{touched.positions?.departments && errors.positions?.departments && (
								<Text color='red.500'>{errors.positions.departments}</Text>
							)}
						</Box>

						{values.positions.departments.length && !jobsLoading ? (
							<Box>
								<Heading as={'h4'} variant={'contentTitle'}>
									Position
									<RequiredAsterisk fontSize={'md'} position={'relative'} top={-1} />
								</Heading>
								<>
									<Text>Select all jobs you held on this project.</Text>
									<Field name='positions.jobs'>
										{({
											field,
											form,
										}: {
											field: FieldInputProps<number[]>;
											form: FormikProps<CreditParams>;
										}) => (
											<ProfileCheckboxGroup
												items={jobs}
												checked={field.value.map(String)}
												handleChange={async (terms: string[]) => {
													await handleJobChange(terms, form.setFieldValue, form.values);
												}}
											/>
										)}
									</Field>
									{touched.positions?.jobs && errors.positions?.jobs && (
										<Text color='red.500'>{errors.positions.jobs}</Text>
									)}
								</>
							</Box>
						) : jobsLoading ? (
							<Spinner />
						) : null}

						{values.positions.jobs.length && !relatedSkillsLoading ? (
							<Box>
								<Heading as={'h4'} variant={'contentTitle'}>
									Skills
								</Heading>
								<>
									<Text>Select any skills used on this job.</Text>
									<Field name='skills'>
										{({
											field,
											form,
										}: {
											field: FieldInputProps<number[]>;
											form: FormikProps<CreditParams>;
										}) => (
											<ProfileCheckboxGroup
												items={skills}
												checked={field.value.map(String)}
												handleChange={async (terms: string[]) => {
													handleSkillsChange(terms, form.setFieldValue, form.values);
												}}
											/>
										)}
									</Field>
								</>
							</Box>
						) : relatedSkillsLoading ? (
							<Spinner />
						) : null}
					</Stack>

					<Flex justifyContent={'flex-end'} mt={4} mb={0}>
						<EditCreditButtons isValid={isValid} dirty={dirty} isSubmitting={isSubmitting} />
					</Flex>
				</Form>
			)}
		</Formik>
	);
}
