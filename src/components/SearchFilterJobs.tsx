import { useContext } from 'react';
import { Heading, Box, Spinner, CheckboxGroup, Wrap } from '@chakra-ui/react';
import { WPItem } from '../lib/classes';
import { usePositions } from '../hooks/queries/usePositions';
import CheckboxButton from './common/inputs/CheckboxButton';

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

	return (
		<Box mt={8}>
			{!loading && !error ? (
				<>
					<Heading as='h3' variant='searchFilterTitle'>
						What job(s) are you looking to fill?
					</Heading>
					<CheckboxGroup defaultValue={search.filters.positions.jobs} onChange={handleToggleTerm}>
						<Wrap>
							{positionItems.map((term: WPItem) => (
								<CheckboxButton key={term.id} value={term.id.toString()}>
									{term.name}
								</CheckboxButton>
							))}
						</Wrap>
					</CheckboxGroup>
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
