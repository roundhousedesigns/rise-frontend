import { useContext } from 'react';
import { Box, Heading, Wrap, Spinner, RadioGroup } from '@chakra-ui/react';
import { WPItem } from '../lib/classes';
import usePositions from '../hooks/queries/usePositions';

import { SearchContext } from '../context/SearchContext';
import RadioButton from './common/inputs/RadioButton';

export default function SearchFilterDepartment() {
	const [data, { loading, error }] = usePositions();
	const { search, searchDispatch } = useContext(SearchContext);

	const handleToggleTerm = (term: string) => {
		searchDispatch({
			type: 'SET_DEPARTMENT',
			payload: {
				department: term,
			},
		});

		// Scroll to next section on selection
		const nextSection = document.getElementById('filterJobs');
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return !loading && !error ? (
		<Box id='filterDepartment'>
			<Heading as='h3' variant='searchFilterTitle'>
				Which department are you hiring for?
			</Heading>
			<RadioGroup onChange={handleToggleTerm} value={search.filters.positions.department}>
				<Wrap>
					{data.map((term: WPItem) => {
						return (
							<RadioButton key={term.id} name='search-departments' value={term.id.toString()}>
								{term.name}
							</RadioButton>
						);
					})}
				</Wrap>
			</RadioGroup>
		</Box>
	) : loading ? (
		<Spinner />
	) : error ? (
		<>Error</>
	) : (
		<>Nada</>
	);
}
