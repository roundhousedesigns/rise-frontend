import { useContext } from 'react';
import { Box, Spinner, CheckboxGroup, Wrap } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import { WPItem } from '@lib/classes';
import { SearchContext } from '@context/SearchContext';
import usePositions from '@queries/usePositions';
import CheckboxButton from '@common/inputs/CheckboxButton';

export default function SearchFilterJobs() {
	const { values, setFieldValue } = useFormikContext<{
		positions: { departments: string[]; jobs: string[] };
	}>();
	const [field] = useField('positions.jobs');
	const { searchDispatch } = useContext(SearchContext);

	const departmentId = values.positions.departments[0];
	const [jobItems, { loading, error }] = usePositions(departmentId ? [Number(departmentId)] : []);

	const handleToggleTerm = (terms: string[]) => {
		setFieldValue('positions.jobs', terms);
		searchDispatch({
			type: 'SET_JOBS',
			payload: {
				jobs: terms,
			},
		});
	};

	return (
		<Box>
			{!loading && !error ? (
				<CheckboxGroup value={field.value} onChange={handleToggleTerm} size={'sm'}>
					<Wrap>
						{jobItems.map((term: WPItem) => (
							<CheckboxButton key={term.id} value={term.id.toString()}>
								{term.name}
							</CheckboxButton>
						))}
					</Wrap>
				</CheckboxGroup>
			) : loading ? (
				<Spinner />
			) : error ? (
				<>Error</>
			) : (
				<>Nada</>
			)}
		</Box>
	);
}
