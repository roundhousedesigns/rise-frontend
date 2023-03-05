import { useContext, useEffect } from 'react';
import { Heading, Wrap, useCheckboxGroup, Box } from '@chakra-ui/react';
import { PositionTerm } from '../lib/types';
import CheckboxButton from './common/CheckboxButton';

import { usePositions } from '../hooks/queries/usePositions';
import { SearchContext } from '../context/SearchContext';

interface Props {
	heading: string;
}

export default function SearchFilterDepartment({ heading }: Props) {
	const { search, searchDispatch } = useContext(SearchContext);
	const { data, loading, error } = usePositions(parseInt(search.filters.position.department));

	const handleToggleTerm = (terms: string[]) => {
		searchDispatch({
			type: 'SET_JOBS',
			payload: {
				jobs: terms,
			},
		});
	};

	// Set the CheckboxGroup value on initial render
	useEffect(() => {
		setValue(search.filters.position.jobs);
	}, []);

	// Subscribe to Reset events in the Search Context
	useEffect(() => {
		if (search.filters.position.jobs.length === 0) {
			setValue([]);
		}
	}, [search.filters.position.jobs.length]);

	const { getCheckboxProps, setValue } = useCheckboxGroup({
		defaultValue: [],
		onChange: handleToggleTerm,
	});

	return !loading && !error ? (
		<Box>
			<Heading size='lg' mb={6} width='full' borderBottom='2px' borderColor='gray.600'>
				{heading}
			</Heading>
			<Wrap justifyContent='flex-start' alignItems='center' width='full'>
				{data.positions.nodes.map((term: PositionTerm) => {
					const checkbox = getCheckboxProps({ value: term.id.toString() });

					return (
						<CheckboxButton key={term.id} {...checkbox}>
							{term.name}
						</CheckboxButton>
					);
				})}
			</Wrap>
		</Box>
	) : loading ? (
		<>Loading...</>
	) : error ? (
		<>Error</>
	) : (
		<>Nada</>
	);
}