import { useContext } from 'react';
import { Box, CheckboxGroup, Wrap, Skeleton } from '@chakra-ui/react';
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

	return (
		<Box style={{ scrollMarginTop: '83px' }}>
			<Skeleton isLoaded={data?.length > 0 && !loading && !error}>
				<Box minH='8em'>
					<CheckboxGroup defaultValue={skills} onChange={handleToggleTerm}>
						<Wrap>
							{data?.map((term: WPItem) => (
								<CheckboxButton key={term.id} value={term.id.toString()}>
									{term.name}
								</CheckboxButton>
							))}
						</Wrap>
					</CheckboxGroup>
				</Box>
			</Skeleton>
			{error ? <ErrorAlert message={error.message} /> : false}
		</Box>
	);
}
