import { useContext } from 'react';
import {
	Accordion,
	Box,
	Fade,
	Icon,
	Text,
	Stack,
	Flex,
	Spacer,
	useToken,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { FiFolder } from 'react-icons/fi';
import { SearchFilterSet } from '@lib/classes';
import { SearchContext } from '@context/SearchContext';
import useSavedSearches from '@hooks/queries/useSavedSearches';
import SearchFilterAccordionItem from '@common/SearchFilterAccordionItem';
import SearchFilterSection from '@common/SearchFilterSection';
import SearchFilterDepartment from '@components/SearchFilterDepartment';
import SearchFilterJobs from '@components/SearchFilterJobs';
import SearchFilterSkills from '@components/SearchFilterSkills';
import AdditionalSearchFilters from '@components/AdditionalSearchFilters';
import SavedSearchItemList from '@components/SavedSearchItemList';
import SearchFilterDates from '@components/SearchFilterDates';
import DepartmentsAutocomplete from '@components/DepartmentsAutocomplete';

export default function SearchWizardView() {
	const { values } = useFormikContext<SearchFilterSet>();
	const {
		search: {
			searchWizardActive,
			filters: { name },
			savedSearch: { id: savedSearchId },
		},
	} = useContext(SearchContext);

	const [savedSearches] = useSavedSearches();

	const [orange] = useToken('colors', ['orange.300']);

	const departments = values.positions.departments || [];
	const jobs = values.positions.jobs || [];

	return (
		<Stack
			direction={'column'}
			justifyContent={'space-between'}
			height={'full'}
			pt={searchWizardActive ? 4 : 0}
			transition={'padding 250ms ease'}
		>
			<Box
				opacity={name ? 0.2 : 1}
				pointerEvents={name ? 'none' : 'auto'}
				transition={'opacity 250ms ease'}
			>
				<Stack gap={6} mt={searchWizardActive ? 0 : 2} mb={4}>
					<Fade in={!savedSearchId} unmountOnExit>
						<Box>
							<Box maxW={'lg'}>
								<DepartmentsAutocomplete />
							</Box>
						</Box>
					</Fade>
					<Box>
						<Stack gap={8}>
							<Box>
								<SearchFilterSection id={'filterDepartment'}>
									<SearchFilterDepartment />
								</SearchFilterSection>
							</Box>
							<Fade in={!!departments.length} unmountOnExit>
								<SearchFilterSection
									id={'filterJobs'}
									heading={'What job(s) are you looking to fill?'}
								>
									<SearchFilterJobs />
								</SearchFilterSection>
							</Fade>
							<Fade in={!!departments.length && !!jobs.length} unmountOnExit>
								<SearchFilterSection
									id={'filterSkills'}
									heading={'What skills are you looking for?'}
								>
									<SearchFilterSkills />
								</SearchFilterSection>
							</Fade>
							<Fade in={!!departments.length && !!jobs.length} unmountOnExit>
								<SearchFilterSection
									id={'filterDates'}
									heading={'Are you hiring for a particular date?'}
								>
									<SearchFilterDates />
								</SearchFilterSection>
							</Fade>
							<Fade in={searchWizardActive && jobs && !!jobs.length} unmountOnExit>
								<SearchFilterSection
									id={'filterAdditional'}
									heading={'And some additional filters to refine your search:'}
								>
									<AdditionalSearchFilters />
								</SearchFilterSection>
							</Fade>
						</Stack>
					</Box>
				</Stack>
			</Box>

			<Spacer />

			<Accordion
				allowToggle
				mb={4}
				defaultIndex={savedSearchId ? 0 : undefined}
				_dark={{ bgColor: 'blackAlpha.300' }}
				_light={{ bgColor: 'gray.100' }}
			>
				<SearchFilterAccordionItem
					heading={
						<Flex alignItems={'center'}>
							<Icon
								as={FiFolder}
								fill={savedSearches?.length > 0 ? orange : 'transparent'}
								mr={2}
							/>
							<Text as={'span'} my={0}>
								Saved Searches
							</Text>
						</Flex>
					}
					isDisabled={!savedSearches || !savedSearches.length}
					headingProps={{ fontSize: 'md' }}
					panelProps={{ mb: 0, px: 3, pb: 4 }}
				>
					<SavedSearchItemList />
				</SearchFilterAccordionItem>
			</Accordion>
		</Stack>
	);
}
