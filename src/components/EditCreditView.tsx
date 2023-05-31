import { ChangeEvent, useContext, useEffect, useReducer, useRef } from 'react';
import {
	ButtonGroup,
	Divider,
	Flex,
	Heading,
	Spinner,
	Stack,
	StackItem,
	Text,
	Button,
} from '@chakra-ui/react';
import { Credit, WPItem } from '../lib/classes';
import { FiCheck, FiX } from 'react-icons/fi';
import { EditProfileContext } from '../context/EditProfileContext';
import { usePositions } from '../hooks/queries/usePositions';
import { useRelatedSkills } from '../hooks/queries/useRelatedSkills';
import { useLazyPositions } from '../hooks/queries/useLazyPositions';
import { useUpdateCredit } from '../hooks/mutations/useUpdateCredit';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';
import TextInput from './common/inputs/TextInput';
import ProfileRadioGroup from './common/ProfileRadioGroup';

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

	const [allDepartments] = usePositions([0]);
	const [getJobs, { data: jobsData, loading: jobsLoading }] = useLazyPositions();
	const [allRelatedSkills] = useRelatedSkills(selectedJobIds);
	const jobs = useRef([]);

	// Refetch jobs list when department changes
	useEffect(() => {
		if (!selectedDepartmentIds) return;

		getJobs({ variables: { departments: selectedDepartmentIds } /*fetchPolicy: 'network-only'*/ });
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
		console.info('before prep', editCredit);
		const creditToUpdate = new Credit(editCredit).prepareCreditForGraphQL();
		console.info('after prep', creditToUpdate);

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

	return (
		<form id='edit-credit' onSubmit={handleSubmit}>
			<Flex py={4} flexWrap='wrap' justifyContent='space-between'>
				<Heading size='lg' lineHeight='base'>
					Edit Credit
				</Heading>
				<ButtonGroup>
					<Button type='submit' leftIcon={<FiCheck />} aria-label='Save credit' colorScheme='green'>
						Save
					</Button>
					<Button
						leftIcon={<FiX />}
						aria-label='Cancel changes'
						colorScheme='red'
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</ButtonGroup>
				{updateCreditLoading ? <Spinner /> : false}
			</Flex>

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

			<Flex gap={6}>
				<TextInput
					name='workStart'
					label='Start year'
					isRequired
					value={workStart}
					onChange={handleInputChange}
					flex='0 0 110px'
				/>

				<TextInput
					name='workEnd'
					label='End year'
					value={!workCurrent ? workEnd : ''}
					isDisabled={workCurrent}
					onChange={handleInputChange}
					flex='0 0 110px'
				/>

				<ProfileRadioGroup
					defaultValue={workCurrent ? 'true' : 'false'}
					name='workCurrent'
					label='Currently working here'
					items={[
						{ label: 'Yes', value: 'true' },
						{ label: 'No', value: 'false' },
					]}
					handleChange={handleRadioInputChange}
					py='0'
				/>
			</Flex>
			<Flex gap={6}>
				<TextInput
					name='venue'
					label='Venue'
					value={venue}
					onChange={handleInputChange}
					isRequired
				/>
				<TextInput
					name='jobLocation'
					label='Job Location'
					value={jobLocation}
					isRequired
					onChange={handleInputChange}
				/>
			</Flex>
			<Divider />

			<Stack direction='column' spacing={6} fontSize='md'>
				{/* TODO Make this required */}
				<StackItem>
					<Heading variant='contentTitle'>Department</Heading>
					<Heading variant='contentSubtitle'>
						Select{' '}
						<Text as='span' fontWeight='bold'>
							any
						</Text>{' '}
						department(s) you worked under.
					</Heading>
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
						<Heading variant='contentTitle'>Position</Heading>
						<Heading variant='contentSubtitle'>
							Select{' '}
							<Text as='span' fontWeight='bold'>
								any
							</Text>{' '}
							jobs that apply to this credit.
						</Heading>
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
						<Heading variant='contentTitle'>Skills</Heading>
						<Heading variant='contentSubtitle'>Select any skills used on this job.</Heading>
						<ProfileCheckboxGroup
							name='skills'
							items={allRelatedSkills}
							checked={selectedSkills ? selectedSkills.map((item: number) => item.toString()) : []}
							handleChange={handleToggleCheckboxTerm}
						/>
					</StackItem>
				) : null}
			</Stack>
		</form>
	);
}
