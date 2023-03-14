import { useReducer } from 'react';
import { Card, Divider, Heading, Stack, StackItem } from '@chakra-ui/react';
import { Credit, WPItem } from '../lib/classes';
import { usePositions } from '../hooks/queries/usePositions';
import EditableTextInput from './common/inputs/EditableTextInput';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';
import ProfileRadioGroup from './common/ProfileRadioGroup';
import { useRelatedSkills } from '../hooks/queries/useRelatedSkills';

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
				department: Number(action.payload.value),
			};

		case 'UPDATE_JOBS':
			return {
				...state,
				jobs: action.payload.value.map((item: number) => Number(item)),
			};

		case 'UPDATE_SKILLS':
			return {
				...state,
				skills: action.payload.value.map((item: number) => Number(item)),
			};

		default:
			return action.payload;
	}
}

interface Props {
	credit: Credit;
}

export default function EditCreditView({ credit }: Props) {
	const [editCredit, editCreditDispatch] = useReducer(editCreditReducer, credit);
	const [selectedTerms, selectedTermsDispatch] = useReducer(selectedTermsReducer, credit.positions);

	const { title, venue, year } = editCredit;
	const {
		department: selectedDepartment,
		jobs: selectedJobs,
		skills: selectedSkills,
	} = selectedTerms;
	const [relatedSkills] = useRelatedSkills(selectedJobs);

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
				value: terms,
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

					{selectedDepartment && selectedJobs && selectedJobs.length ? (
						<StackItem>
							<Heading size='sm' mb={2}>
								Skills
							</Heading>
							<ProfileCheckboxGroup
								name='skills'
								items={relatedSkills}
								checked={
									selectedSkills ? selectedSkills.map((item: number) => item.toString()) : []
								}
								handleChange={handleToggleCheckboxTerm}
							/>
						</StackItem>
					) : null}
				</Stack>
			</form>
		</Card>
	);
}
