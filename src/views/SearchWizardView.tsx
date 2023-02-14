import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { FormControl, Flex, Button, Stack } from '@chakra-ui/react';

import SearchFilterDepartment from '../components/SearchFilterDepartment';
import SearchFilterJobs from '../components/SearchFilterJobs';
import SearchFilterSkills from '../components/SearchFilterSkills';

import { SearchContext } from '../context/SearchContext';
import { useCandidateSearch } from '../hooks/queries/useCandidateSearch';

export default function SearchWizardView() {
	const {
		search: { filters, searchActive, results },
		searchDispatch,
	} = useContext(SearchContext);
	const navigate = useNavigate();
	const { data, loading, error, refetch } = useCandidateSearch(filters);

	// Any time we change the filters, refetch the results
	useEffect(() => {
		if (!filters.position.department || !filters.position.jobs) return;

		refetch({ ...filters });
	}, [filters]);

	// Update the SearchContext with the new results whenever the query returns
	useEffect(() => {
		if (isEqual(data?.filteredCandidates, results)) return;

		searchDispatch({
			type: 'SET_RESULTS',
			payload: {
				results: data?.filteredCandidates,
			},
		});
	}, [data?.filteredCandidates]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		navigate('/results');
	};

	const handleReset = () => {
		searchDispatch({
			type: 'RESET',
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl textAlign='left'>
				<Stack direction='column' gap={8}>
					{/* Step 1 */}
					<SearchFilterDepartment heading='Which department are you hiring for?' />

					{/* Step 2 */}
					{filters.position.department ? (
						<SearchFilterJobs heading='What job(s) are you looking to fill?' />
					) : null}

					{/* Step 3 */}
					{filters.position.department &&
					filters.position.jobs &&
					filters.position.jobs.length > 0 ? (
						<SearchFilterSkills heading='What skills are you looking for?' />
					) : null}

					<Flex gap={2}>
						{searchActive ? (
							// TODO Close Drawer if open when submitting a Search
							<Button type='submit' size='lg'>
								Search
							</Button>
						) : null}
						<Button type='reset' size='lg' onClick={handleReset}>
							Reset
						</Button>
					</Flex>
				</Stack>
			</FormControl>
		</form>
	);
}
