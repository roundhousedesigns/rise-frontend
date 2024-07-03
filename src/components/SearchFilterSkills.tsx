import { useContext } from 'react';
import { Heading, Box, Spinner, CheckboxGroup, Wrap } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import useRelatedSkills from '@hooks/queries/useRelatedSkills';

import ErrorAlert from '@common/ErrorAlert';
import CheckboxButton from '@common/inputs/CheckboxButton';
import { SearchContext } from '@context/SearchContext';

export default function SearchFilterSkills(): JSX.Element {
	const {
		search: {
			filters: {
				filterSet: { positions, skills },
			},
		},
		searchDispatch,
	} = useContext(SearchContext);
	const [data, { loading, error }] = useRelatedSkills(positions.jobs);

	const handleToggleTerm = (terms: string[]) => {
		searchDispatch({
			type: 'SET_FILTER',
			payload: {
				filter: {
					key: 'skills',
					value: terms,
				},
			},
		});
	};

	return data?.length > 0 && !loading && !error ? (
		<Box id='filterSkills' style={{ scrollMarginTop: '83px' }}>
			<Heading as='h3' variant='searchFilterTitle'>
				What skills are you looking for?
			</Heading>
			<CheckboxGroup defaultValue={skills} onChange={handleToggleTerm}>
				<Wrap>
					{data.map((term: WPItem) => (
						<CheckboxButton key={term.id} value={term.id.toString()}>
							{term.name}
						</CheckboxButton>
					))}
				</Wrap>
			</CheckboxGroup>
		</Box>
	) : loading ? (
		<Spinner />
	) : error ? (
		<ErrorAlert message={error.message} />
	) : (
		<></>
	);
}
