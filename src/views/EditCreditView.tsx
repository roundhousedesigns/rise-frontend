import { ChangeEvent, memo, useContext, useEffect, useReducer, useState } from 'react';
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
import { CreditParams } from '@lib/types';
import { Credit, WPItem } from '@lib/classes';
import { sortWPItemsByName } from '@lib/utils';
import { FiCheck, FiX } from 'react-icons/fi';
import { EditProfileContext } from '@context/EditProfileContext';
import usePositions from '@queries/usePositions';
import useLazyPositions from '@queries/useLazyPositions';
import useLazyRelatedSkills from '@queries/useLazyRelatedSkills';
import useViewer from '@queries/useViewer';
import useUpdateCredit from '@mutations/useUpdateCredit';
import ProfileCheckboxGroup from '@common/inputs/ProfileCheckboxGroup';
import RequiredAsterisk from '@common/RequiredAsterisk';
import TextInput from '@common/inputs/TextInput';
import ProfileRadioGroup from '@common/inputs/ProfileRadioGroup';
import TooltipIconButton from '@common/inputs/TooltipIconButton';

function editCreditReducer(state: CreditParams, action: { type: string; payload: any }) {
	switch (action.type) {
		case 'UPDATE_INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};

		case 'UPDATE_DEPARTMENTS':
			return {
				...state,
				positions: {
					...state.positions,
					departments: action.payload.value.map((item: number) => item),
				},
			};

		case 'UPDATE_JOBS':
			return {
				...state,
				positions: {
					...state.positions,
					jobs: action.payload.value.map((item: number) => item),
				},
			};

		case 'UPDATE_SKILLS':
			return {
				...state,
				skills: action.payload.value.map((item: number) => item),
			};

		case 'INIT':
		case 'RESET':
			return action.payload;

		default:
			return state;
	}
}

interface Props {
	creditId: string;
	onClose: () => void;
}

export default function EditCreditView({ creditId, onClose: closeModal }: Props) {
	const [{ loggedInId }] = useViewer();
	const { editProfile } = useContext(EditProfileContext);
	const credit = editProfile.credits?.find((credit) => credit.id === creditId);
	const [editCredit, editCreditDispatch] = useReducer(editCreditReducer, credit);

	const toast = useToast();

	const {
		updateCreditMutation,
		results: { loading: updateCreditLoading },
	} = useUpdateCredit();

	const {
		title,
		jobTitle,
		jobLocation,
		venue,
		workStart,
		workEnd,
		workCurrent,
		intern,
		fellow,
		positions: { departments: selectedDepartmentIds = [], jobs: selectedJobIds = [] },
		skills: selectedSkills,
	} = editCredit;

	const [allDepartments] = usePositions();
	const [getJobs, { loading: jobsLoading }] = useLazyPositions();
	const [jobs, setJobs] = useState<WPItem[]>([]);
	const [getRelatedSkills, { loading: relatedSkillsLoading }] = useLazyRelatedSkills();
	const [skills, setSkills] = useState<WPItem[]>([]);

	const [requirementsMet, setRequirementsMet] = useState<boolean>(false);
	const requiredFields = ['title', 'jobTitle', 'jobLocation', 'venue', 'workStart'];

	// Fetch jobs & skills lists on mount
	useEffect(() => {
		refetchAndSetJobs(selectedDepartmentIds);
		refetchAndSetSkills(selectedJobIds);
	}, []);

	// Check that all required fields have been filled.
	useEffect(() => {
		let allFilled = requiredFields.every((field: string) => {
			if (!!editCredit[field]) return true;

			return false;
		});

		// Ensure a department is set.
		allFilled = allFilled && selectedDepartmentIds.length > 0;

		// Ensure a job is set.
		allFilled = allFilled && selectedJobIds.length > 0;

		setRequirementsMet(allFilled);
	}, [editCredit]);

	/** Fetches jobs given array of departmentIds, sets jobs
	 *
	 * @returns {Array} returns array of numbers of related/visible jobIds
	 */
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

			const jobsByDeptIds = jobsByDept.map((j: WPItem) => Number(j.id));

			return jobsByDeptIds;
		} else {
			setJobs([]);

			return [];
		}
	};

	/** Fetches skills given array of jobIds, sets skills
	 *
	 * @returns {Array} returns array of numbers related/visible skillIds
	 */

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

			const relatedSkillIds = relatedSkills.map((s: WPItem) => Number(s.id));

			return relatedSkillIds;
		} else {
			setSkills([]);

			return [];
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		editCreditDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value,
			},
		});
	};

	const dispatchCheckboxTermChange = (name: string, terms: number[]) => {
		editCreditDispatch({
			type: `UPDATE_${name.toUpperCase()}`,
			payload: {
				value: terms,
			},
		});
	};

	const handleDepartmentsChange = (name: string) => async (terms: string[]) => {
		// update depts:
		const termsAsNums = terms.map((i) => Number(i));
		dispatchCheckboxTermChange(name, termsAsNums);

		// update jobs to align with selected depts:
		const visibleJobs = await refetchAndSetJobs(termsAsNums);
		const filteredSelectedJobIds = selectedJobIds.filter((id: number) => visibleJobs.includes(id));
		dispatchCheckboxTermChange('jobs', filteredSelectedJobIds);

		// update skills to align with selected jobs:
		const visibleSkills = await refetchAndSetSkills(filteredSelectedJobIds);
		const filteredSelectedSkillIds = selectedSkills.filter((id: number) =>
			visibleSkills.includes(id)
		);
		dispatchCheckboxTermChange('skills', filteredSelectedSkillIds);
	};

	const handleJobsChange = (name: string) => async (terms: string[]) => {
		// update jobs
		const termsAsNums = terms.map((i) => Number(i));
		dispatchCheckboxTermChange(name, termsAsNums);

		// update skills to align with selected jobs:
		const visibleSkills = await refetchAndSetSkills(termsAsNums);
		const filteredSelectedSkillIds = selectedSkills.filter((id: number) =>
			visibleSkills.includes(id)
		);
		dispatchCheckboxTermChange('skills', filteredSelectedSkillIds);
	};

	const handleSkillsChange = (name: string) => (terms: string[]) => {
		// update skills
		const termsAsNums = terms.map((i) => Number(i));
		dispatchCheckboxTermChange(name, termsAsNums);
	};

	const handleRadioInputChange = (name: string) => (value: string) => {
		editCreditDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value: value === 'true' ? true : false,
			},
		});
	};

	const handleSubmit = () => {
		const creditToUpdate = new Credit(editCredit).prepareCreditForGraphQL();

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
			.catch((err: any) => {
				toast({
					title: 'Oops!',
					description: 'There was an error saving this credit.' + err,
					status: 'error',
					duration: 3000,
					isClosable: true,
					position: 'bottom',
				});

				console.error(err);
			});
	};

	const handleCancel = () => {
		closeModal();
		editCreditDispatch({
			type: 'RESET',
			payload: credit,
		});
	};

	const EditCreditButtons = memo(() => {
		return (
			<ButtonGroup size='md'>
				<TooltipIconButton
					type='submit'
					isLoading={updateCreditLoading}
					onClick={handleSubmit}
					icon={<FiCheck />}
					label='Save'
					colorScheme='green'
					isDisabled={!requirementsMet || updateCreditLoading}
				/>
				<TooltipIconButton
					icon={<FiX />}
					label={'Cancel changes'}
					colorScheme='red'
					onClick={handleCancel}
					isDisabled={updateCreditLoading}
				/>
			</ButtonGroup>
		);
	});

	return (
		<>
			<Flex flex='1' justifyContent={'space-between'} py={2} mb={2}>
				<Heading as='h3' size='lg' lineHeight='base'>
					Edit Credit
				</Heading>
				<EditCreditButtons />
			</Flex>

			<Flex gap={4}>
				<TextInput
					name='title'
					label={'Company/Production Name'}
					value={title}
					isRequired
					onChange={handleInputChange}
					debounceTime={300}
				/>

				<TextInput
					name='jobTitle'
					label={'Job/Position Title'}
					isRequired
					value={jobTitle}
					onChange={handleInputChange}
					debounceTime={300}
				/>
			</Flex>

			<Flex justifyContent={'space-between'} w='full' gap={4} flexWrap='wrap' mt={1}>
				<TextInput
					name='workStart'
					label={'Start year'}
					isRequired
					value={workStart}
					onChange={handleInputChange}
					flex='1'
					debounceTime={300}
				/>

				<TextInput
					name='workEnd'
					label={'End year'}
					value={!workCurrent ? workEnd : ''}
					isDisabled={workCurrent}
					onChange={handleInputChange}
					flex='1'
					debounceTime={300}
				/>

				<ProfileRadioGroup
					defaultValue={workCurrent ? 'true' : 'false'}
					name='workCurrent'
					label={'Currently working here'}
					items={[
						{ label: 'Yes', value: 'true' },
						{ label: 'No', value: 'false' },
					]}
					handleChange={handleRadioInputChange}
				/>
			</Flex>

			<Flex justifyContent={'space-between'} w='full' gap={4} flexWrap='wrap' mt={1}>
				<TextInput
					name='venue'
					label='Venue'
					value={venue}
					onChange={handleInputChange}
					isRequired
					flex='1'
					debounceTime={300}
				/>

				<TextInput
					name='jobLocation'
					label={'Job Location'}
					value={jobLocation}
					isRequired
					onChange={handleInputChange}
					flex='1'
					debounceTime={300}
				/>
			</Flex>

			<Flex justifyContent={'flex-start'} w='full' gap={4} flexWrap='wrap' mt={1}>
				<ProfileRadioGroup
					defaultValue={intern ? 'true' : 'false'}
					name='intern'
					label={`This ${workCurrent ? 'is' : 'was'} an internship`}
					items={[
						{ label: 'Yes', value: 'true' },
						{ label: 'No', value: 'false' },
					]}
					handleChange={handleRadioInputChange}
				/>

				<ProfileRadioGroup
					defaultValue={fellow ? 'true' : 'false'}
					name='fellow'
					label={`This ${workCurrent ? 'is' : 'was'} a fellowship`}
					items={[
						{ label: 'Yes', value: 'true' },
						{ label: 'No', value: 'false' },
					]}
					handleChange={handleRadioInputChange}
				/>
			</Flex>

			<Divider />

			<Stack direction='column' spacing={6} fontSize='md'>
				{/* TODO Make this required */}
				<Box>
					<Heading as='h4' variant='contentTitle'>
						Department
						<RequiredAsterisk fontSize='md' position='relative' top={-1} />
					</Heading>
					<Text>Select all department(s) you worked under.</Text>
					<ProfileCheckboxGroup
						name='departments'
						items={allDepartments}
						checked={
							selectedDepartmentIds
								? selectedDepartmentIds.map((item: number) => item.toString())
								: []
						}
						handleChange={handleDepartmentsChange}
					/>
				</Box>
				{selectedDepartmentIds.length && !jobsLoading ? (
					<Box>
						<Heading as='h4' variant='contentTitle'>
							Position
							<RequiredAsterisk fontSize='md' position='relative' top={-1} />
						</Heading>
						<>
							<Text>Select all jobs you held on this project.</Text>
							<ProfileCheckboxGroup
								name='jobs'
								items={jobs}
								checked={
									selectedJobIds ? selectedJobIds.map((item: number) => item.toString()) : []
								}
								handleChange={handleJobsChange}
							/>
						</>
					</Box>
				) : jobsLoading ? (
					<Spinner />
				) : null}

				{selectedJobIds.length && !relatedSkillsLoading ? (
					<Box>
						<Heading as='h4' variant='contentTitle'>
							Skills
						</Heading>
						<>
							<Text>Select any skills used on this job.</Text>
							<ProfileCheckboxGroup
								name='skills'
								items={skills}
								checked={
									selectedSkills ? selectedSkills.map((item: number) => item.toString()) : []
								}
								handleChange={handleSkillsChange}
							/>
						</>
					</Box>
				) : relatedSkillsLoading ? (
					<Spinner />
				) : null}
			</Stack>

			<Flex justifyContent={'flex-end'} mt={4} mb={0}>
				<EditCreditButtons />
			</Flex>
		</>
	);
}
