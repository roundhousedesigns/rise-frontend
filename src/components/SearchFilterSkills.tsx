import { useContext, useEffect } from 'react';
import { Heading, Wrap, useCheckboxGroup, Box, Alert } from '@chakra-ui/react';
import { SkillTerm } from '../lib/types';
import { useRelatedSkills } from '../hooks/queries/useRelatedSkills';

import ErrorAlert from './common/ErrorAlert';
import CheckboxButton from './common/CheckboxButton';
import { SearchContext } from '../context/SearchContext';

interface Props {
	heading: string;
}

export default function SearchFilterSkills({ heading }: Props) {
	const { search, searchDispatch } = useContext(SearchContext);
	const { data, loading, error } = useRelatedSkills(
		search.filters.position.department,
		search.filters.position.jobs
	);

	const handleToggleTerm = (terms: string[]) => {
		searchDispatch({
			type: 'SET_SKILLS',
			payload: {
				skills: terms,
			},
		});
	};

	const { getCheckboxProps, setValue } = useCheckboxGroup({
		defaultValue: [],
		onChange: handleToggleTerm,
	});

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

	return data?.jobSkills?.length > 0 && !loading && !error ? (
		<Box>
			<Heading size='lg' mb={6} w='full' borderBottom='2px' borderColor='gray.600'>
				{heading}
			</Heading>
			<Wrap justifyContent='flex-start' alignItems='center' fontSize='sm' w='full'>
				{data.jobSkills?.map((term: SkillTerm) => {
					const checkbox = getCheckboxProps({ value: term.id.toString() });

					return (
						<CheckboxButton key={term.id} {...checkbox}>
							{term.name}
						</CheckboxButton>
					);
				})}
			</Wrap>
			{/* TODO implement "More Skills" button, which will append remaining Skills (excluding those already present) to the list. */}
		</Box>
	) : loading ? (
		<>Loading...</>
	) : error ? (
		<ErrorAlert message={error.message} />
	) : (
		// TODO implement "All Skills" button, which will append remaining Skills (excluding those already present) to the list.
		// Same as "More Skills", but without "exclude" parameter.
		<Alert status='info'>No job-specific skills found.</Alert>
	);
}
