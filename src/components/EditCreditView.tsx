import { ChangeEvent, useContext, useEffect, useReducer, useRef } from 'react';
import {
	ButtonGroup,
	Divider,
	Flex,
	Heading,
	Text,
	Spinner,
	Stack,
	StackItem,
	useMediaQuery,
	Box,
} from '@chakra-ui/react';
import { Credit, WPItem } from '../lib/classes';
import { FiCheck, FiX } from 'react-icons/fi';
import { EditProfileContext } from '../context/EditProfileContext';
import usePositions from '../hooks/queries/usePositions';
import useRelatedSkills from '../hooks/queries/useRelatedSkills';
import useLazyPositions from '../hooks/queries/useLazyPositions';
import useUpdateCredit from '../hooks/mutations/useUpdateCredit';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';
import TextInput from './common/inputs/TextInput';
import ProfileRadioGroup from './common/ProfileRadioGroup';
import ResponsiveButton from './common/inputs/ResponsiveButton';

// TODO type this reducer
function editCreditReducer(state: Credit, action: { type: string; payload: any }) {
	switch (action.type) {
		case 'UPDATE_INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};

		case 'UPDATE_DEPARTMENT':
			return {
				...state,
				positions: {
					...state.positions,
					department: action.payload.value.map((item: number) => item),
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
	const { editProfile, editProfileDispatch } = useContext(EditProfileContext);
	const credit = editProfile.credits?.find((credit) => credit.id === creditId);
	const [editCredit, editCreditDispatch] = useReducer(editCreditReducer, credit);
	const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

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
		positions: { department: selectedDepartmentIds = [], jobs: selectedJobIds = [] },
		skills: selectedSkills,
	} = editCredit;

	const [allDepartments] = usePositions();
	const [getJobs, { data: jobsData, loading: jobsLoading }] = useLazyPositions();
	const jobs = useRef([]);
	const [allRelatedSkills] = useRelatedSkills(selectedJobIds);

	// Refetch jobs list when department changes
	useEffect(() => {
		if (selectedDepartmentIds.length === 0) return;

		getJobs({ variables: { departments: selectedDepartmentIds }, fetchPolicy: 'network-only' });
	}, [selectedDepartmentIds]);

	// Set jobs when jobsData changes.
	useEffect(() => {
		jobs.current = jobsData
			? jobsData.jobsByDepartments.map((item: WPItem) => new WPItem(item))
			: [];
	}, [jobsData]);

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		editCreditDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value,
			},
		});
	};

	const handleToggleCheckboxTerm = (name: string) => (terms: string[]) => {
		editCreditDispatch({
			type: `UPDATE_${name.toUpperCase()}`,
			payload: {
				value: terms,
			},
		});
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

		updateCreditMutation(creditToUpdate, editCredit.id)
			.then((results) => {
				editProfileDispatch({
					type: 'UPDATE_CREDIT',
					payload: {
						credit: results.data.updateOrCreateCredit.updatedCredit,
						newCreditTempId: editCredit.isNew ? editCredit.id : null,
					},
				});
			})
			.then(() => closeModal())
			.catch((err: any) => {
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

	const EditCreditButtons = () => (
		<ButtonGroup size='md'>
			<ResponsiveButton
				type='submit'
				icon={<FiCheck />}
				label='Save'
				colorScheme='green'
				onClick={handleSubmit}
			>
				Save
			</ResponsiveButton>
			<ResponsiveButton
				icon={<FiX />}
				label='Cancel changes'
				colorScheme='red'
				onClick={handleCancel}
			>
				Cancel
			</ResponsiveButton>
		</ButtonGroup>
	);

	return (
		<Box>
			<Flex flex='1' justifyContent='space-between' py={2}>
				<Heading as='h3' size='lg' lineHeight='base'>
					Edit Credit
				</Heading>
				<EditCreditButtons />
			</Flex>

			{updateCreditLoading ? <Spinner /> : false}

			<TextInput
				name='title'
				label='Production/Show/Company Title'
				value={title}
				isRequired
				onChange={handleInputChange}
				flex='1'
			/>

			<TextInput
				name='jobTitle'
				label='Job/Position Title'
				isRequired
				value={jobTitle}
				onChange={handleInputChange}
			/>

			<Flex justifyContent='space-between' w='full' gap={4} flexWrap='wrap'>
				<TextInput
					name='workStart'
					label='Start year'
					isRequired
					value={workStart}
					onChange={handleInputChange}
					flex='1'
				/>

				<TextInput
					name='workEnd'
					label='End year'
					value={!workCurrent ? workEnd : ''}
					isDisabled={workCurrent}
					onChange={handleInputChange}
					flex='1'
				/>

				<ProfileRadioGroup
					defaultValue={workCurrent ? 'true' : 'false'}
					name='workCurrent'
					label='Currently working here'
					flex={{ base: '0 0 100%', md: '0 0 50%' }}
					items={[
						{ label: 'Yes', value: 'true' },
						{ label: 'No', value: 'false' },
					]}
					handleChange={handleRadioInputChange}
				/>
			</Flex>

			<Flex justifyContent='space-between' w='full' gap={4} flexWrap='wrap'>
				<TextInput
					name='venue'
					label='Venue'
					value={venue}
					onChange={handleInputChange}
					isRequired
					flex='1'
				/>

				<TextInput
					name='jobLocation'
					label='Job Location'
					value={jobLocation}
					isRequired
					onChange={handleInputChange}
					flex='1'
				/>
			</Flex>

			<Divider />

			<Stack direction='column' spacing={6} fontSize='md'>
				{/* TODO Make this required */}
				<StackItem>
					<Heading as='h4' variant='contentTitle'>
						Department
					</Heading>
					<Text>
						Select <strong>any</strong> department(s) you worked under.
					</Text>
					<ProfileCheckboxGroup
						name='department'
						items={allDepartments}
						checked={
							selectedDepartmentIds
								? selectedDepartmentIds.map((item: number) => item.toString())
								: []
						}
						handleChange={handleToggleCheckboxTerm}
					/>
				</StackItem>
				{selectedDepartmentIds && !jobsLoading ? (
					<StackItem>
						<Heading as='h4' variant='contentTitle'>
							Position
						</Heading>
						<Text>
							Select <strong>any</strong> jobs that apply to this credit.
						</Text>
						<ProfileCheckboxGroup
							name='jobs'
							items={jobs.current}
							checked={selectedJobIds ? selectedJobIds.map((item: number) => item.toString()) : []}
							handleChange={handleToggleCheckboxTerm}
						/>
					</StackItem>
				) : jobsLoading ? (
					<Spinner />
				) : null}

				{allRelatedSkills &&
				allRelatedSkills.length > 0 &&
				selectedDepartmentIds &&
				selectedJobIds &&
				selectedJobIds.length ? (
					<StackItem>
						<Heading as='h4' variant='contentTitle'>
							Skills
						</Heading>
						<Text>Select any skills used on this job.</Text>
						<ProfileCheckboxGroup
							name='skills'
							items={allRelatedSkills}
							checked={selectedSkills ? selectedSkills.map((item: number) => item.toString()) : []}
							handleChange={handleToggleCheckboxTerm}
						/>
					</StackItem>
				) : null}
			</Stack>

			<Flex justifyContent='flex-end' mt={4} mb={0}>
				<EditCreditButtons />
			</Flex>
		</Box>
	);
}
