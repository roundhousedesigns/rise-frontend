import { useContext, useEffect, useState } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { usePositions } from '../hooks/queries/usePositions';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';

import { SearchContext } from '../context/SearchContext';

interface Props {
	heading: string;
}

export default function SearchFilterJobs({ heading }: Props) {
	const { search, searchDispatch } = useContext(SearchContext);
	const [value, setValue] = useState<string[]>([]);
	const [terms, { loading, error }] = usePositions(parseInt(search.filters.position.department));

	const handleToggleTerm = (name: string) => (terms: string[]) => {
		searchDispatch({
			type: `SET_${name.toUpperCase()}`,
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

	return (
		<Box>
			{!loading && !error ? (
				<>
					<Heading size='lg' mb={6} w='full' borderBottom='2px' borderColor='gray.600'>
						{heading}
					</Heading>
					<ProfileCheckboxGroup
						name='jobs'
						items={terms}
						checked={value}
						handleChange={handleToggleTerm}
					/>
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
