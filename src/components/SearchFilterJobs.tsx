import { useContext, useEffect } from 'react';
import { Heading, Wrap, Box, Spinner, useCheckboxGroup } from '@chakra-ui/react';
import { WPItem } from '../lib/classes';
import { usePositions } from '../hooks/queries/usePositions';
import CheckboxButton from './common/CheckboxButton';

import { SearchContext } from '../context/SearchContext';

interface Props {
	heading: string;
}

export default function SearchFilterJobs({ heading }: Props) {
	const { search, searchDispatch } = useContext(SearchContext);
	const [data, { loading, error }] = usePositions(parseInt(search.filters.positions.department));

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
		<Box>
			{!loading && !error ? (
				<>
					<Heading size='lg' mb={6} w='full' borderBottom='2px' borderColor='gray.600'>
						{heading}
					</Heading>
					<Wrap justifyContent='flex-start' alignItems='center' w='full'>
						{data.map((term: WPItem) => {
							const checkbox = getCheckboxProps({ value: term.id.toString() });

							return (
								<CheckboxButton key={term.id} {...checkbox}>
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
