import { FormControl, Flex, Button } from '@chakra-ui/react';
import { useContext } from 'react';

import SearchFilterDepartment from '../components/SearchFilterDepartment';
import SearchFilterJob from '../components/SearchFilterJob';

import { SearchContext } from '../context/SearchContext';

export default function SearchWizardView() {
	const {
		search: { position },
		searchDispatch,
	} = useContext(SearchContext);

	const handleReset = () => {
		searchDispatch({
			type: 'RESET',
		});
	};

	return (
		<FormControl textAlign='left'>
			{/* Step 1 */}
			<SearchFilterDepartment heading='Which department are you hiring for?' />

			{/* Step 2 */}
			{position.department ? (
				<SearchFilterJob heading='What job(s) are you looking to fill?' />
			) : (
				''
			)}

			{/* Step 3 */}
			{/* TODO */}
			{/* <SearchFilterSkills heading='What skills are you looking for?' /> */}

			<Flex gap={2}>
				<Button type='submit' size='lg'>
					Search
				</Button>
				<Button type='reset' size='lg' onClick={handleReset}>
					Reset
				</Button>
			</Flex>
		</FormControl>
	);
}
