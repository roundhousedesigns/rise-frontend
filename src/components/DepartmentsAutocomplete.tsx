import { useContext } from 'react';
import { FormControl, FormLabel, FormHelperText, Heading, Box } from '@chakra-ui/react';
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
import usePositions from '@queries/usePositions';

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
			type: 'SET_POSITIONS',
			payload: {
				departments: [parentId.toString()],
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
		<Box id='autocompleteDepartment'>
			<FormControl>
				<Heading as={FormLabel} variant='searchFilterTitle' mb={4}>
					Type a job title to begin.
				</Heading>
				<Box flex={'1 0 400px'}>
					<AutoComplete onSelectOption={handleAutocompleteSelect} openOnFocus>
						<AutoCompleteInput variant='filled' placeholder={'Start typing'} />
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
				<FormHelperText fontSize='xs' maxW={'75%'}>
					Your starting filters will be selected automatically, and you can adjust them as you like.
				</FormHelperText>
			</FormControl>
		</Box>
	);
}
