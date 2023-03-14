import { Key, useReducer } from 'react';
import { Card } from '@chakra-ui/react';
import { Credit, WPItem } from '../lib/classes';
import { usePositions } from '../hooks/queries/usePositions';
import EditableTextInput from './common/inputs/EditableTextInput';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';
import ProfileRadioGroup from './common/ProfileRadioGroup';

interface Props {
	credit: Credit;
}

function editCreditReducer(state: Credit, action: { type: string; payload: any }) {
	switch (action.type) {
		case 'UPDATE_INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};

		default:
			return action.payload;
	}
}

function selectedTermsReducer(
	state: { department: number; jobs: number[]; skills: number[] },
	action: { type: string; payload: any }
) {
	switch (action.type) {
		case 'UPDATE_DEPARTMENT':
			return {
				...state,
				department: action.payload.value,
			};

		case 'UPDATE_JOBS':
			return {
				...state,
				jobs: action.payload,
			};

		case 'UPDATE_SKILLS':
			return {
				...state,
				skills: action.payload,
			};

		default:
			return action.payload;
	}
}

export default function EditCreditView({ credit }: Props) {
	const [editCredit, editCreditDispatch] = useReducer(editCreditReducer, credit);
	const [selectedTerms, selectedTermsDispatch] = useReducer(selectedTermsReducer, credit.positions);

	const { id, title, venue, year, positions, skills } = editCredit;
	const {
		department: selectedDepartment,
		jobs: selectedJobs,
		skills: selectedSkills,
	} = selectedTerms;

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
		selectedTermsDispatch({
			type: `UPDATE_${name.toUpperCase()}`,
			payload: {
				value: term,
			},
		});
	};

	const handleToggleCheckboxTerm = (name: string) => (terms: string[]) => {
		selectedTermsDispatch({
			type: `UPDATE_${name.toUpperCase()}`,
			payload: {
				[name]: terms,
			},
		});
	};

	return (
		<Card>
			<form>
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

				<ProfileRadioGroup
					name='department'
					items={departments?.map((term: WPItem) => ({
						label: term.name,
						value: term.id.toString(),
					}))}
					defaultValue={selectedTerms.department}
					handleChange={handleToggleRadioTerm}
				/>

				{/* TODO This is the big baddy */}
				{selectedDepartment && (
					<ProfileCheckboxGroup
						name='jobs'
						items={jobs}
						checked={selectedTerms?.jobs}
						handleChange={handleToggleCheckboxTerm}
					/>
				)}
			</form>
		</Card>
	);
}
