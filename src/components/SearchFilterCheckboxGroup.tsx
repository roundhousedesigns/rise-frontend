import { useContext, useEffect } from 'react';
import { Heading, Wrap, Box, Spinner, useCheckboxGroup } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import usePositions from '@queries/usePositions';
import CheckboxButton from '@common/inputs/CheckboxButton';

import { SearchContext } from '@context/SearchContext';

interface Props {
	heading: string;
}

export default function SearchFilterJobs({ heading }: Props) {
	const { search, searchDispatch } = useContext(SearchContext);
	const [positionItems, { loading, error }] = usePositions([
		Number(
			search.filters.filterSet.positions.departments
				? search.filters.filterSet.positions.departments[0]
				: '0'
		),
	]);

	const handleToggleTerm = (terms: string[]) => {
		searchDispatch({
			type: 'SET_JOBS',
			payload: {
				jobs: terms,
			},
		});
	};

	const { getCheckboxProps, setValue } = useCheckboxGroup({
		defaultValue: [],
		onChange: handleToggleTerm,
	});

	// Set the CheckboxGroup value on initial render
	useEffect(() => {
		if (search.filters.filterSet.positions.jobs !== undefined) {
			setValue(search.filters.filterSet.positions.jobs);
			return;
		}

		setValue([]);
	}, []);

	// Subscribe to Reset events in the Search Context
	useEffect(() => {
		if (
			!search.filters.filterSet.positions.jobs ||
			search.filters.filterSet.positions.jobs.length === 0
		) {
			setValue([]);
		}
	}, [search.filters.filterSet.positions.jobs]);

	return (
		<Box>
			{!loading && !error ? (
				<>
					<Heading
						as='h3'
						size='md'
						mb={6}
						pb={2}
						w='full'
						borderBottom='2px'
						borderColor={'gray.600'}
					>
						{heading}
					</Heading>
					<Wrap justifyContent={'flex-start'} alignItems='center' w='full'>
						{positionItems.map((term: WPItem) => {
							const checkbox = getCheckboxProps({ value: term.id.toString() });

							return (
								<CheckboxButton key={term.id} {...checkbox}>
									{term.name}
								</CheckboxButton>
							);
						})}
					</Wrap>
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
