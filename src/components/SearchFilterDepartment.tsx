import { useContext } from 'react';
import { Heading, Wrap, RadioGroup, Radio, useRadioGroup } from '@chakra-ui/react';
import { PositionTerm } from '../lib/types';
import { usePositions } from '../hooks/queries/usePositions';
import { RadioButton } from './common/RadioButton';

import { SearchContext } from '../context/SearchContext';

interface Props {
	heading: string;
}

export default function SearchFilterDepartment({ heading }: Props) {
	const { data, loading, error } = usePositions();
	const { searchDispatch } = useContext(SearchContext);

	const handleToggleTerm = (term: string) => {
		searchDispatch({
			type: 'SET_DEPARTMENT',
			payload: {
				department: term,
			},
		});
	};

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'department',
		defaultValue: '',
		onChange: handleToggleTerm,
	});

	const group = getRootProps();

	return !loading && !error ? (
		<>
			<Heading size='md' mb={3} width='full' borderBottom='2px' borderColor='gray.600'>
				{heading}
			</Heading>
			<Wrap justifyContent='flex-start' alignItems='center' width='full' gap={4} mb={4} {...group}>
				{data.positions.nodes.map((term: PositionTerm) => {
					const radio = getRadioProps({ value: term.id.toString() });

					return (
						<RadioButton key={term.id} {...radio}>
							{term.name}
						</RadioButton>
					);
				})}
			</Wrap>
		</>
	) : loading ? (
		<>Loading...</>
	) : error ? (
		<>Error</>
	) : (
		<>Nada</>
	);
}
