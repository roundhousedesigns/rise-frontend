import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, Flex, Button, Stack } from '@chakra-ui/react';

import SearchFilterDepartment from '../components/SearchFilterDepartment';
import SearchFilterJobs from '../components/SearchFilterJobs';
import SearchFilterSkills from '../components/SearchFilterSkills';

import { SearchContext } from '../context/SearchContext';
import { useUsersWithSkills } from '../hooks/queries/useUsersWithSkills';

export default function SearchWizardView() {
	const {
		search: { position, skills },
		searchDispatch,
	} = useContext(SearchContext);

	const navigate = useNavigate();

	const { data, loading, error } = useUsersWithSkills(skills);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		searchDispatch({
			type: 'SET_RESULTS',
			payload: {
				results: data.usersWithSkills,
			},
		});

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
					{position.department && (
						<SearchFilterJobs heading='What job(s) are you looking to fill?' />
					)}

					{/* Step 3 */}
					{position.department && position.jobs.length > 0 && (
						<SearchFilterSkills heading='What skills are you looking for?' />
					)}

					<Flex gap={2}>
						{position.department && position.jobs.length && skills.length > 0 && (
							//  TODO Close Drawer if open when submitting a Search
							<Button type='submit' size='lg'>
								Search
							</Button>
						)}
						<Button type='reset' size='lg' onClick={handleReset}>
							Reset
						</Button>
					</Flex>
				</Stack>
			</FormControl>
		</form>
	);
}
