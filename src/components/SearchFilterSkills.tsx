import { useContext, useEffect, useState } from 'react';
import { Heading, Box, Alert, Spinner } from '@chakra-ui/react';
import { useRelatedSkills } from '../hooks/queries/useRelatedSkills';

import ErrorAlert from './common/ErrorAlert';
import { SearchContext } from '../context/SearchContext';
import ProfileCheckboxGroup from './common/ProfileCheckboxGroup';

interface Props {
	heading: string;
}

export default function SearchFilterSkills({ heading }: Props) {
	const { search, searchDispatch } = useContext(SearchContext);
	const [value, setValue] = useState<string[]>([]);
	const [terms, { loading, error }] = useRelatedSkills(search.filters.position.jobs);

	const handleToggleTerm = (name: string) => (value: string[]) => {
		searchDispatch({
			type: `SET_${name.toUpperCase()}`,
			payload: {
				skills: value,
			},
		});
	};

	// Set the RadioGroup value on initial render
	useEffect(() => {
		setValue(search.filters.skills);
	}, []);

	// Subscribe to Reset events in the Search Context
	useEffect(() => {
		if (search.filters.skills.length === 0) {
			setValue([]);
		}
	}, [search.filters.skills.length]);

	return terms?.length > 0 && !loading && !error ? (
		<Box>
			<Heading size='lg' mb={6} w='full' borderBottom='2px' borderColor='gray.600'>
				{heading}
			</Heading>

			<ProfileCheckboxGroup
				name='skills'
				items={terms}
				checked={value}
				handleChange={handleToggleTerm}
				// fontSize='sm'
			/>
			{/* TODO implement "More Skills" button, which will append remaining Skills (excluding those already present) to the list. */}
		</Box>
	) : loading ? (
		<Spinner />
	) : error ? (
		<ErrorAlert message={error.message} />
	) : (
		// TODO implement "All Skills" autocomplete field, which will append remaining Skills (excluding those already present) to the list.
		// Same as "More Skills", but without "exclude" parameter.
		<Alert status='info'>No job-specific skills found.</Alert>
	);
}
