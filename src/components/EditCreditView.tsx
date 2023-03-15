import { useContext, useReducer } from 'react';
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
	const { editProfileDispatch } = useContext(EditProfileContext);

	const {
		title,
		venue,
		year,
		positions: { department: selectedDepartment, jobs: selectedJobs },
		skills: selectedSkills,
	} = editCredit;

	const [allRelatedSkills] = useRelatedSkills(selectedJobs);

	// TODO fix running usePositions on each click.
	// make sure there's an argument to send first, now we're getting all terms all the time before limiting the results.

	// The full positions lists.
	const [departments] = usePositions();
	const [jobs] = usePositions(Number(selectedDepartment));

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
		e.preventDefault();
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
				label='Title'
				defaultValue={title}
				handleChange={handleInputChange}
			/>
			<EditableTextInput
				name='year'
				label='Year'
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

			<Stack direction='column' spacing={6}>
				<StackItem>
					<Heading size='sm' mb={2}>
						Department
					</Heading>
					<ProfileRadioGroup
						name='department'
						items={departments?.map((term: WPItem) => ({
							label: term.name,
							value: term.id.toString(),
						}))}
						defaultValue={selectedDepartment.toString()}
						handleChange={handleToggleRadioTerm}
					/>
				</StackItem>
				{selectedDepartment ? (
					<StackItem>
						<Heading size='sm' mb={2}>
							Position
						</Heading>
						<ProfileCheckboxGroup
							name='jobs'
							items={jobs}
							checked={selectedJobs ? selectedJobs.map((item: number) => item.toString()) : []}
							handleChange={handleToggleCheckboxTerm}
						/>
					</StackItem>
				) : null}

				{allRelatedSkills &&
				allRelatedSkills.length > 0 &&
				selectedDepartment &&
				selectedJobs &&
				selectedJobs.length ? (
					<StackItem>
						<Heading size='sm' mb={2}>
							Skills
						</Heading>
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
