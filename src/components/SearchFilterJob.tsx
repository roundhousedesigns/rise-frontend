import { useContext } from 'react';
import { Heading, Wrap, CheckboxGroup, Checkbox } from '@chakra-ui/react';
import { PositionTerm } from '../lib/types';
import { usePositions } from '../hooks/queries/usePositions';

import { SearchContext } from '../context/SearchContext';

interface Props {
	heading: string;
}

export default function SearchFilterJob({ heading }: Props) {
	const { search, searchDispatch } = useContext(SearchContext);
	const { data, loading, error } = usePositions(parseInt(search.position.department));

	// TODO improve event typing
	const handleChange = (term: any) => {
		searchDispatch({
			type: 'TOGGLE_JOBS',
			payload: {
				job: term.currentTarget.id,
			},
		});
	};

	return !loading && !error ? (
		<>
			<Heading size='md' mb={3} width='full' borderBottom='2px' borderColor='gray.600'>
				{heading}
			</Heading>
			<Wrap justifyContent='flex-start' alignItems='center' width='full' gap={4} mb={4}>
				<CheckboxGroup value={search.position.jobs}>
					{data.positions.nodes.map((term: PositionTerm) => (
						<Checkbox
							key={term.id}
							id={term.id.toString()}
							value={term.id.toString()}
							onChange={handleChange}
						>
							{term.name}
						</Checkbox>
					))}
				</CheckboxGroup>
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
