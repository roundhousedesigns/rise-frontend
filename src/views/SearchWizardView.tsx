import React, { useContext, useEffect } from 'react';
import { Flex, Button, Stack } from '@chakra-ui/react';

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
		search: { filters, searchActive },
		searchDispatch,
	} = useContext(SearchContext);

	const handleReset = () => {
		searchDispatch({
			type: 'RESET_SEARCH_FILTERS',
		});
	};

	return (
		<form id='search-candidates' onSubmit={onSubmit}>
			<Stack direction='column' gap={8}>
				{/* TODO convert Department, Jobs, and Skills to unified <CheckboxButtonFilterGroup> interface */}
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
