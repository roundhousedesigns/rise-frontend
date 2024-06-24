import { useContext, useMemo } from 'react';
import {
	Box,
	Heading,
	Wrap,
	Spinner,
	RadioGroup,
	FormControl,
	FormLabel,
	FormHelperText,
} from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import usePositions from '@hooks/queries/usePositions';
import {
	AutoComplete,
	AutoCompleteGroup,
	AutoCompleteGroupTitle,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
	Item,
} from '@choc-ui/chakra-autocomplete';
import { SearchContext } from '@context/SearchContext';
import RadioButton from '@common/inputs/RadioButton';

export default function SearchFilterDepartment() {
	const [data, { loading, error }] = usePositions();
	const {
		search: {
			filters: {
				filterSet: {
					positions: { departments },
				},
			},
		},
		searchDispatch,
	} = useContext(SearchContext);

	const [allDepartments] = usePositions([0]);
	// const allDepartmentIds = useMemo(() => {
	// 	return allDepartments.map((d: WPItem) => d.id);
	// }, [allDepartments]);
	const [allJobs] = usePositions(allDepartments?.map((job: WPItem) => job.id));
	const allPositions: { [key: string]: WPItem[] } = {};
	allDepartments?.forEach((d: WPItem) => {
		allPositions[d.id.toString()] = allJobs.filter((job: WPItem) => job.parentId === d.id);
	});

	const handleToggleTerm = (term: string) => {
		searchDispatch({
			type: 'SET_DEPARTMENT',
			payload: {
				departments: [term],
			},
		});

		// Scroll to next section on selection
		const nextSection = document.getElementById('filterJobs');
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

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
	};

	const departmentId = useMemo(() => {
		return departments && departments.length > 0 ? departments[0] : '';
	}, [departments]);

	return !loading && !error ? (
		<Box id='filterDepartment'>
			<Heading as='h3' variant='searchFilterTitle'>
				Which department are you hiring for?
			</Heading>
			<FormControl mb={4}>
				<FormLabel>Find a department</FormLabel>
				<AutoComplete openOnFocus onSelectOption={handleAutocompleteSelect}>
					<AutoCompleteInput />
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
				<FormHelperText>Type the name of a job to select its department.</FormHelperText>
			</FormControl>
			<RadioGroup onChange={handleToggleTerm} value={departmentId}>
				<Wrap>
					{data.map((term: WPItem) => {
						return (
							<RadioButton key={term.id} name='search-departments' value={term.id.toString()}>
								{term.name}
							</RadioButton>
						);
					})}
				</Wrap>
			</RadioGroup>
		</Box>
	) : loading ? (
		<Spinner />
	) : error ? (
		<>Error</>
	) : (
		<>Nada</>
	);
}
