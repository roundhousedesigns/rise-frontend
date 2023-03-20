import { useContext, useEffect, useReducer, useState } from 'react';
import {
	ButtonGroup,
	Card,
	Divider,
	Heading,
	IconButton,
	Stack,
	StackItem,
} from '@chakra-ui/react';
import { Credit, WPItem } from '../lib/classes';
import { EditProfileContext } from '../context/EditProfileContext';
import { usePositions } from '../hooks/queries/usePositions';
import EditableTextInput from './common/inputs/EditableTextInput';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';
import ProfileRadioGroup from './common/ProfileRadioGroup';
import { useRelatedSkills } from '../hooks/queries/useRelatedSkills';
import { FiCheck, FiX } from 'react-icons/fi';
import { usePositionsLazy } from '../hooks/queries/usePositionsLazy';

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

		case 'RESET':
			return action.payload;

		default:
			return state;
	}
}

interface Props {
	credit: Credit;
	onClose: () => void;
}

export default function EditCreditView({ credit, onClose: closeModal }: Props) {
	const [editCredit, editCreditDispatch] = useReducer(editCreditReducer, credit);
	const [department, setDepartment] = useState<number>();
	const [jobs, setJobs] = useState<WPItem[]>([]);
	const { editProfileDispatch } = useContext(EditProfileContext);
	const {
		title,
		venue,
		year,
		positions: { department: selectedDepartmentId, jobs: selectedJobIds },
		skills: selectedSkills,
	} = editCredit;

	const [allDepartments] = usePositions();
	const [getJobs, { data: jobsData }] = usePositionsLazy();

	// const [allJobs] = usePositions([allDepartments?.map((department) => department.id)])
	const [allRelatedSkills] = useRelatedSkills(selectedJobIds);

	// Update jobs list when department changes
	useEffect(() => {
		if (!selectedDepartmentId) return;

		getJobs({ variables: { parent: selectedDepartmentId } });

		if (jobsData) {
			setJobs(jobsData.positions?.nodes.map((item: WPItem) => new WPItem(item)));
		}
	}, [selectedDepartmentId]);

	// TODO fix running usePositions on each click.
	// make sure there's an argument to send first, now we're getting all terms all the time before limiting the results.
	// The full positions lists.
	// const [departments] = usePositions();
	// const [jobs] = usePositions(Number(selectedDepartmentId));

	// const departments = useMemo(
	// 	() => allPositions?.filter((item) => item.parentId === 0),
	// 	[allPositions]
	// );

	// const jobs = useMemo(
	// 	() => allPositions?.filter((item) => item.parentId === selectedDepartmentId),
	// 	[allPositions, selectedDepartmentId]
	// );

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

	const handleSave = (e: React.FormEvent) => {
		closeModal();
		editProfileDispatch({
			type: 'UPDATE_CREDIT',
			payload: {
				credit: editCredit,
			},
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
			<EditableTextInput
				name='title'
				label='Production Title'
				defaultValue={title}
				handleChange={handleInputChange}
			/>
			<EditableTextInput
				name='year'
				label='Year (start of employment)'
				defaultValue={year}
				handleChange={handleInputChange}
			/>
			<EditableTextInput
				name='venue'
				label='Venue'
				defaultValue={venue}
				handleChange={handleInputChange}
			/>

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
						defaultValue={selectedDepartmentId.toString()}
						handleChange={handleToggleRadioTerm}
					/>
				</StackItem>
				{selectedDepartmentId ? (
					<StackItem>
						<Heading variant='contentTitle'>Position</Heading>
						<Heading variant='contentSubtitle'>Select all that apply to this job.</Heading>
						<ProfileCheckboxGroup
							name='jobs'
							items={jobs}
							checked={selectedJobIds ? selectedJobIds.map((item: number) => item.toString()) : []}
							handleChange={handleToggleCheckboxTerm}
						/>
					</StackItem>
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
