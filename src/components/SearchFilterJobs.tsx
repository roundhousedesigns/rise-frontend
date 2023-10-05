import { useContext } from 'react';
import { Heading, Box, Spinner, CheckboxGroup, Wrap } from '@chakra-ui/react';
import { WPItem } from '../lib/classes';
import usePositions from '@hooks/queries/usePositions';
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
	const [jobItems, { loading, error }] = usePositions([parseInt(departments[0])]);

	const handleToggleTerm = (terms: string[]) => {
		searchDispatch({
			type: 'SET_JOBS',
			payload: {
				jobs: terms,
			},
		});
	};

	return (
		<Box id='filterJobs' mt={8}>
			{!loading && !error ? (
				<>
					<Heading as='h3' variant='searchFilterTitle'>
						What job(s) are you looking to fill?
					</Heading>
					<CheckboxGroup defaultValue={jobs} onChange={handleToggleTerm}>
						<Wrap>
							{jobItems.map((term: WPItem) => (
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
