import { useContext, useEffect, useState } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { WPItem } from '../lib/classes';
import { usePositions } from '../hooks/queries/usePositions';
import ProfileRadioGroup from './common/ProfileRadioGroup';

import { SearchContext } from '../context/SearchContext';

interface Props {
	heading: string;
}

export default function SearchFilterDepartment({ heading }: Props) {
	const [terms, { loading, error }] = usePositions();
	const [value, setValue] = useState<string>('');
	const { search, searchDispatch } = useContext(SearchContext);

	const handleToggleTerm = (name: string) => (value: string) => {
		searchDispatch({
			type: `SET_${name.toUpperCase()}`,
			payload: {
				department: value,
			},
		});
	};

	// Set the RadioGroup value on initial render
	useEffect(() => {
		setValue(search.filters.position.department);
	}, []);

	// Subscribe to Reset events in the Search Context
	useEffect(() => {
		if (search.filters.position.department === '') {
			setValue('');
		}
	}, [search.filters.position.department]);

	return !loading && !error ? (
		<Box>
			<Heading size='lg' mb={6} w='full' borderBottom='2px' borderColor='gray.600'>
				{heading}
			</Heading>
			<ProfileRadioGroup
				name='department'
				items={terms.map((term: WPItem) => ({
					label: term.name,
					value: term.id.toString(),
				}))}
				defaultValue={value.toString()}
				handleChange={handleToggleTerm}
			/>
		</Box>
	) : loading ? (
		<Spinner />
	) : error ? (
		<>Error</>
	) : (
		<>Nada</>
	);
}
