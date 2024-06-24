import { useContext } from 'react';
import { FormControl, FormLabel, FormHelperText, Heading, Box, Flex } from '@chakra-ui/react';
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteList,
	AutoCompleteGroup,
	AutoCompleteGroupTitle,
	AutoCompleteItem,
	Item,
} from '@choc-ui/chakra-autocomplete';
import { WPItem } from '@lib/classes';
import { SearchContext } from '@context/SearchContext';
import usePositions from '@hooks/queries/usePositions';

export default function DepartmentsAutocomplete() {
	const { searchDispatch } = useContext(SearchContext);

	const [allDepartments] = usePositions([0]);
	const [allJobs] = usePositions(allDepartments?.map((job: WPItem) => job.id));
	const allPositions: { [key: string]: WPItem[] } = {};
	allDepartments?.forEach((d: WPItem) => {
		allPositions[d.id.toString()] = allJobs?.filter((job: WPItem) => job.parentId === d.id);
	});

	const handleAutocompleteSelect = (params: { item: Item }) => {
		const {
			item: {
				originalValue: { id, parentId },
			},
		} = params;

		searchDispatch({
			type: 'SET_DEPARTMENT',
			payload: {
				departments: [parentId.toString()],
			},
		});

		searchDispatch({
			type: 'SET_JOBS',
			payload: {
				jobs: [id.toString()],
			},
		});

		// Scroll to Skills section on selection
		const filterSkills = document.getElementById('filterSkills');
		if (filterSkills) {
			filterSkills.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<FormControl mb={4}>
			<Heading as={FormLabel} variant='searchFilterTitle' mb={4}>
				Type a job name to begin.
			</Heading>
			<Flex gap={2} alignItems='center' flexWrap='wrap'>
				<Box flex='1 0 400px'>
					<AutoComplete onSelectOption={handleAutocompleteSelect}>
						<AutoCompleteInput variant='filled' placeholder='Dialect Coach, Director, Copyist...' />
						<AutoCompleteList>
							{Object.entries(allPositions).map(([departmentId, positions]) => {
								const department = allDepartments.find(
									(d: WPItem) => d.id.toString() === departmentId
								);

								return (
									<AutoCompleteGroup key={department?.id} showDivider>
										<AutoCompleteGroupTitle textTransform='capitalize'>
											{department?.name}
										</AutoCompleteGroupTitle>
										{positions?.map((job: WPItem) => (
											<AutoCompleteItem
												key={job.id}
												value={job}
												getValue={(job: WPItem) => job.name}
												textTransform='capitalize'
											>
												{job.name}
											</AutoCompleteItem>
										))}
									</AutoCompleteGroup>
								);
							})}
						</AutoCompleteList>
					</AutoComplete>
				</Box>
				<FormHelperText my={0} flex='1'>
					Your department and first job will be selected automatically.
				</FormHelperText>
			</Flex>
		</FormControl>
	);
}
