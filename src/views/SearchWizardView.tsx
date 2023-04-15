import React, { useContext } from 'react';
import { Flex, Button, Stack, Text } from '@chakra-ui/react';

import SearchFilterDepartment from '../components/SearchFilterDepartment';
import SearchFilterJobs from '../components/SearchFilterJobs';
import SearchFilterSkills from '../components/SearchFilterSkills';

import { SearchContext } from '../context/SearchContext';

interface Props {
	showButtons?: boolean;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchWizardView({ showButtons, onSubmit }: Props) {
	const {
		search: {
			filters: {
				positions: { department, jobs },
			},
			searchActive,
		},
		searchDispatch,
	} = useContext(SearchContext);

	const handleReset = () => {
		searchDispatch({
			type: 'RESET_SEARCH_FILTERS',
			payload: {},
		});
	};

	return (
		<form id='search-candidates' onSubmit={onSubmit}>
			<Text variant='devAlert'>
				While search is under development, results accuracy is not guaranteed.
			</Text>
			<Stack direction='column' gap={8}>
				{/* TODO convert Department, Jobs, and Skills to unified <CheckboxButtonFilterGroup> interface */}
				{/* Step 1 */}
				<SearchFilterDepartment heading='Which department are you hiring for?' />

				{/* Step 2 */}
				{department ? <SearchFilterJobs heading='What job(s) are you looking to fill?' /> : null}

				{/* Step 3 */}
				{department && jobs && jobs.length > 0 ? (
					<SearchFilterSkills heading='What skills are you looking for?' />
				) : null}

				{showButtons ? (
					<Flex gap={2}>
						{searchActive ? (
							<Button type='submit' size='lg'>
								Search
							</Button>
						) : null}
						<Button type='reset' size='lg' onClick={handleReset}>
							Reset
						</Button>
					</Flex>
				) : null}
			</Stack>
		</form>
	);
}
