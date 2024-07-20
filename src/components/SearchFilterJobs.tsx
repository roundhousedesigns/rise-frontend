import { useContext } from 'react';
import { Box, Spinner, CheckboxGroup, Wrap } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import usePositions from '@queries/usePositions';
import CheckboxButton from '@common/inputs/CheckboxButton';

import { SearchContext } from '@context/SearchContext';

export default function SearchFilterJobs() {
	const {
		search: {
			filters: {
				filterSet: {
					positions: { departments = [], jobs },
				},
			},
		},
		searchDispatch,
	} = useContext(SearchContext);

	const [jobItems, { loading, error }] = usePositions([Number(departments[0])]);

	const handleToggleTerm = (terms: string[]) => {
		searchDispatch({
			type: 'SET_JOBS',
			payload: {
				jobs: terms,
			},
		});
	};

	return (
		<Box>
			{!loading && !error ? (
				<CheckboxGroup value={jobs} onChange={handleToggleTerm} size='sm'>
					<Wrap>
						{jobItems.map((term: WPItem) => (
							<CheckboxButton key={term.id} value={term.id.toString()}>
								{term.name}
							</CheckboxButton>
						))}
					</Wrap>
				</CheckboxGroup>
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
