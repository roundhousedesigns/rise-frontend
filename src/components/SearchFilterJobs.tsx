import { useContext, useEffect } from 'react';
import { Heading, Wrap, Box, Spinner, useCheckboxGroup } from '@chakra-ui/react';
import { WPItem } from '../lib/classes';
import { usePositions } from '../hooks/queries/usePositions';
import CheckboxButton from './common/CheckboxButton';

import { SearchContext } from '../context/SearchContext';

export default function SearchFilterJobs() {
	const { search, searchDispatch } = useContext(SearchContext);
	const [positionItems, { loading, error }] = usePositions([
		parseInt(search.filters.positions.department),
	]);

	const handleToggleTerm = (terms: string[]) => {
		searchDispatch({
			type: 'SET_JOBS',
			payload: {
				jobs: terms,
			},
		});
	};

	const { getCheckboxProps, setValue } = useCheckboxGroup({
		defaultValue: [],
		onChange: handleToggleTerm,
	});

	// Set the CheckboxGroup value on initial render
	useEffect(() => {
		setValue(search.filters.positions.jobs);
	}, []);

	// Subscribe to Reset events in the Search Context
	useEffect(() => {
		if (search.filters.positions.jobs.length === 0) {
			setValue([]);
		}
	}, [search.filters.positions.jobs.length]);

	return (
		<Box mt={8}>
			{!loading && !error ? (
				<>
					<Heading as='h3' variant='searchFilterTitle'>What job(s) are you looking to fill?</Heading>
					<Wrap justifyContent='flex-start' alignItems='center' w='full'>
						{positionItems.map((term: WPItem) => {
							const checkbox = getCheckboxProps({ value: term.id.toString() });

							return (
								<CheckboxButton fontSize='md' key={term.id} {...checkbox}>
									{term.name}
								</CheckboxButton>
							);
						})}
					</Wrap>
				</>
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
