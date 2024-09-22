import { useContext, useEffect, useMemo } from 'react';
import { Box, Heading, Wrap, Spinner, RadioGroup } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import usePositions from '@queries/usePositions';
import { SearchContext } from '@context/SearchContext';
import RadioButton from '@common/inputs/RadioButton';
import { useField, useFormikContext } from 'formik';

export default function SearchFilterDepartment() {
	const [data, { loading, error }] = usePositions();
	const {
		search: {
			savedSearch: { id: savedSearchId },
		},
		searchDispatch,
	} = useContext(SearchContext);

	const { setFieldValue } = useFormikContext();
	const [field] = useField('positions.departments');

	useEffect(() => {
		console.info('field.value', field.value);
	}, [field.value]);

	const handleToggleTerm = (term: string) => {
		setFieldValue('positions.departments', [term]);
		setFieldValue('positions.jobs', []); // Clear jobs when department changes

		searchDispatch({
			type: 'SET_DEPARTMENTS',
			payload: {
				departments: [term],
			},
		});

		// Scroll to next section on selection
		const nextSection = document.getElementById('filterJobs');
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const departmentId = useMemo(() => {
		return field.value && field.value.length > 0 ? field.value[0] : '';
	}, [field.value]);

	if (loading) return <Spinner />;
	if (error) return <>Error</>;

	return (
		<Box id={'filterDepartment'}>
			<Heading as={'h3'} variant={'searchFilterTitle'} mb={4}>
				{savedSearchId ? 'Browse' : 'Or, browse'} by department:
			</Heading>
			<RadioGroup onChange={handleToggleTerm} value={departmentId} size={'sm'}>
				<Wrap>
					{data.map((term: WPItem) => (
						<RadioButton key={term.id} name={'search-departments'} value={term.id.toString()}>
							{term.name}
						</RadioButton>
					))}
				</Wrap>
			</RadioGroup>
		</Box>
	);
}
