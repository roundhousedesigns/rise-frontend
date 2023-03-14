import { useContext, useEffect } from 'react';
import { Box, Heading, Wrap, useRadioGroup, Spinner } from '@chakra-ui/react';
import { WPItem } from '../lib/classes';
import { usePositions } from '../hooks/queries/usePositions';
import RadioButton from './common/RadioButton';

import { SearchContext } from '../context/SearchContext';

interface Props {
	heading: string;
}

export default function SearchFilterDepartment({ heading }: Props) {
	const [data, { loading, error }] = usePositions();
	const { search, searchDispatch } = useContext(SearchContext);

	const handleToggleTerm = (term: string) => {
		searchDispatch({
			type: 'SET_DEPARTMENT',
			payload: {
				department: term,
			},
		});
	};

	const { getRootProps, getRadioProps, setValue } = useRadioGroup({
		name: 'department',
		defaultValue: '',
		onChange: handleToggleTerm,
	});

	// Set the RadioGroup value on initial render
	useEffect(() => {
		setValue(search.filters.positions.department);
	}, []);

	// Subscribe to Reset events in the Search Context
	useEffect(() => {
		if (search.filters.positions.department === '') {
			setValue('');
		}
	}, [search.filters.positions.department]);

	const group = getRootProps();

	return !loading && !error ? (
		<Box>
			<Heading size='lg' mb={6} w='full' borderBottom='2px' borderColor='gray.600'>
				{heading}
			</Heading>
			<Wrap justifyContent='flex-start' alignItems='center' w='full' fontSize='xl' {...group}>
				{data.map((term: WPItem) => {
					const radio = getRadioProps({ value: term.id.toString() });

					return (
						<RadioButton key={term.id} {...radio}>
							{term.name}
						</RadioButton>
					);
				})}
			</Wrap>
		</Box>
	) : loading ? (
		<Spinner />
	) : error ? (
		<>Error</>
	) : (
		<>Nada</>
	);
}
