import { useContext, useEffect, useReducer, useRef } from 'react';
import {
	ButtonGroup,
	Card,
	Divider,
	Flex,
	Heading,
	IconButton,
	Spinner,
	Stack,
	StackItem,
	Wrap,
} from '@chakra-ui/react';
import { Credit, WPItem } from '../lib/classes';
import { FiCheck, FiX } from 'react-icons/fi';
import { EditProfileContext } from '../context/EditProfileContext';
import { usePositions } from '../hooks/queries/usePositions';
import { useRelatedSkills } from '../hooks/queries/useRelatedSkills';
import { usePositionsLazy } from '../hooks/queries/usePositionsLazy';
import { useUpdateCredit } from '../hooks/mutations/useUpdateCredit';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';
import ProfileRadioGroup from './common/ProfileRadioGroup';
import EditableTextInput from './common/inputs/EditableTextInput';

// TODO type payload better
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
					department: Number(action.payload.value),
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
		year,
		positions: { department: selectedDepartmentId = 0, jobs: selectedJobIds = [] }, // TODO are defaults here necessary?
		skills: selectedSkills,
	} = editCredit;

	const [allDepartments] = usePositions();
	const jobs = useRef([]);
	const [getJobs, { data: jobsData, loading: jobsLoading }] = usePositionsLazy();

	const [allRelatedSkills] = useRelatedSkills(selectedJobIds);

	// Refetch jobs list when department changes
	useEffect(() => {
		if (!selectedDepartmentId) return;

		getJobs({ variables: { parent: selectedDepartmentId }, fetchPolicy: 'network-only' });
	}, [selectedDepartmentId]);

	// Set jobs when jobsData changes.
	useEffect(() => {
		// TODO if needed: jobs.current is the same as jobsData, exit. Otherwise, set jobs.current to jobsData.

		jobs.current = jobsData ? jobsData.positions.nodes.map((item: WPItem) => new WPItem(item)) : [];
	}, [jobsData]);

	const handleInputChange = (name: string) => (newValue: string) => {
		editCreditDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value: newValue,
			},
		});
	};

	const handleToggleRadioTerm = (name: string) => (term: string) => {
		editCreditDispatch({
			type: `UPDATE_${name.toUpperCase()}`,
			payload: {
				value: term,
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

	const handleSave = () => {
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

	return (
		<Card>
			<Wrap>
				<ButtonGroup>
					<IconButton
						aria-label='Accept changes'
						colorScheme='green'
						icon={<FiCheck />}
						onClick={handleSave}
					/>
					<IconButton
						aria-label='Cancel changes'
						colorScheme='red'
						icon={<FiX />}
						onClick={handleCancel}
					/>
				</ButtonGroup>
				{updateCreditLoading ? <Spinner /> : false}
			</Wrap>

			<EditableTextInput
				name='title'
				label='Production/Show/Company Title'
				defaultValue={title}
				handleChange={handleInputChange}
				outerProps={{ flex: 1 }}
			/>

			<Flex gap={6}>
				<EditableTextInput
					name='jobTitle'
					label='Job/Position Title'
					defaultValue={jobTitle}
					handleChange={handleInputChange}
				/>

				<EditableTextInput
					name='year'
					label='Year (start of employment)'
					defaultValue={year}
					handleChange={handleInputChange}
					outerProps={{ flex: '0 0 100px' }}
				/>
			</Flex>
			<Flex gap={6}>
				<EditableTextInput
					name='venue'
					label='Venue'
					defaultValue={venue}
					handleChange={handleInputChange}
				/>
				<EditableTextInput
					name='jobLocation'
					label='Job Location'
					defaultValue={jobLocation}
					handleChange={handleInputChange}
				/>
			</Flex>
			<Divider />

			<Stack direction='column' spacing={6} fontSize='md'>
				<StackItem>
					<Heading variant='contentTitle'>Department</Heading>
					<Heading variant='contentSubtitle'>Select your main department.</Heading>

					<ProfileRadioGroup
						name='department'
						items={allDepartments?.map((term: WPItem) => ({
							label: term.name,
							value: term.id.toString(),
						}))}
						defaultValue={selectedDepartmentId ? selectedDepartmentId.toString() : ''}
						handleChange={handleToggleRadioTerm}
					/>
				</StackItem>
				{selectedDepartmentId && !jobsLoading ? (
					<StackItem>
						<Heading variant='contentTitle'>Position</Heading>
						<Heading variant='contentSubtitle'>Select all that apply to this job.</Heading>
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
				selectedDepartmentId &&
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
		</Card>
	);
}
