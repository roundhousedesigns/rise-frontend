import { FormEvent, useContext, useEffect, useState } from 'react';
import { Accordion, Box, Fade, Icon, Text, Stack, StackItem, Flex } from '@chakra-ui/react';
import { SearchContext } from '@context/SearchContext';
import SearchFilterAccordionItem from '@common/SearchFilterAccordionItem';
import SearchFilterSection from '@common/SearchFilterSection';
import SearchFilterDepartment from '@components/SearchFilterDepartment';
import SearchFilterJobs from '@components/SearchFilterJobs';
import SearchFilterSkills from '@components/SearchFilterSkills';
import SearchFilterName from '@components/SearchFilterName';
import AdditionalSearchFilters from '@components/AdditionalSearchFilters';
import SavedSearchItemList from '@components/SavedSearchItemList';
import SearchFilterDates from '@components/SearchFilterDates';
import DepartmentsAutocomplete from '@components/DepartmentsAutocomplete';
import { FiFolder, FiUser } from 'react-icons/fi';

interface Props {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SearchWizardView({ onSubmit }: Props) {
	const {
		search: {
			searchWizardActive,
			filters: {
				name,
				filterSet: {
					positions: { departments = [], jobs = [] },
				},
			},
			savedSearch: { id: savedSearchId },
		},
	} = useContext(SearchContext);

	const [optionsAccordionIndex, setOptionsAccordionIndex] = useState<number | undefined>();

	useEffect(() => {
		if (!!name) {
			setOptionsAccordionIndex(0);
		} else if (searchWizardActive && !savedSearchId) {
			setOptionsAccordionIndex(undefined);
		} else if (savedSearchId) {
			setOptionsAccordionIndex(1);
		} else {
			setOptionsAccordionIndex(undefined);
		}

		return () => {
			setOptionsAccordionIndex(undefined);
		};
	}, [searchWizardActive, savedSearchId]);

	const handleOptionsAccordionIndexChange = (index: number) => {
		setOptionsAccordionIndex(index);
	};

	return (
		<>
			<Accordion
				allowToggle
				mb={4}
				// defaultIndex={name ? 0 : !!savedSearchId ? 1 : undefined}
				onChange={handleOptionsAccordionIndexChange}
				index={optionsAccordionIndex}
				_dark={{ bgColor: 'blackAlpha.300' }}
				_light={{ bgColor: 'gray.1000' }}
			>
				<SearchFilterAccordionItem
					heading={
						<Flex alignItems='center'>
							<Icon as={FiUser} mr={2} />
							<Text as='span' my={0}>
								Search by name
							</Text>
						</Flex>
					}
					headingProps={{ fontSize: 'md' }}
					panelProps={{ mb: 0, mt: -2 }}
				>
					<SearchFilterName px={3} />
				</SearchFilterAccordionItem>
				<SearchFilterAccordionItem
					heading={
						<Flex alignItems='center'>
							<Icon as={FiFolder} mr={2} />
							<Text as='span' my={0}>
								Saved searches
							</Text>
						</Flex>
					}
					headingProps={{ fontSize: 'md' }}
				>
					<SavedSearchItemList px={4} />
				</SearchFilterAccordionItem>
			</Accordion>
			<Stack
				direction='column'
				justifyContent='space-between'
				height='full'
				mt={4}
				transition='margin 250ms ease'
			>
				<Box
					opacity={name ? 0.2 : 1}
					pointerEvents={name ? 'none' : 'auto'}
					transition='opacity 250ms ease'
				>
					<form id='search-candidates' onSubmit={onSubmit}>
						<Stack gap={6} mt={searchWizardActive ? 0 : 2} mb={4}>
							<Fade in={!savedSearchId} unmountOnExit>
								<StackItem>
									<Box maxW='lg'>
										<DepartmentsAutocomplete />
									</Box>
								</StackItem>
							</Fade>
							<StackItem>
								<Stack gap={8}>
									<StackItem>
										<SearchFilterSection id='filterDepartment'>
											<SearchFilterDepartment />
										</SearchFilterSection>
									</StackItem>
									<Fade in={!!departments.length} unmountOnExit>
										<SearchFilterSection
											id='filterJobs'
											heading='What job(s) are you looking to fill?'
										>
											<SearchFilterJobs />
										</SearchFilterSection>
									</Fade>
									<Fade in={!!departments.length && !!jobs.length} unmountOnExit>
										<SearchFilterSection
											id='filterSkills'
											heading='What skills are you looking for?'
										>
											<SearchFilterSkills />
										</SearchFilterSection>
									</Fade>
									<Fade in={!!departments.length && !!jobs.length} unmountOnExit>
										<SearchFilterSection
											id='filterDates'
											heading='Are you hiring for a particular date?'
										>
											<SearchFilterDates />
										</SearchFilterSection>
									</Fade>
									<Fade in={searchWizardActive && jobs && !!jobs.length} unmountOnExit>
										<SearchFilterSection
											id='filterAdditional'
											heading='And some additional filters to refine your search:'
										>
											<AdditionalSearchFilters />
										</SearchFilterSection>
									</Fade>
								</Stack>
							</StackItem>
						</Stack>
					</form>
				</Box>
			</Stack>
		</>
	);
}
