import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Stack,
	Heading,
	IconButton,
	Button,
	ButtonGroup,
	Collapse,
	Spinner,
	Accordion,
	Flex,
	Icon,
	Text,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { isEqual } from 'lodash';
import { FiRefreshCcw, FiSearch, FiUser, FiX } from 'react-icons/fi';
import { SearchContext } from '@context/SearchContext';
import useViewer from '@queries/useViewer';
import useCandidateSearch from '@queries/useCandidateSearch';
import SearchWizardView from '@views/SearchWizardView';
import { SearchFilterSet } from '@lib/classes';
import SearchFilterAccordionItem from '@common/SearchFilterAccordionItem';
import SearchFilterName from '@components/SearchFilterName';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default function SearchDrawer({ isOpen, onClose }: Props) {
	const [{ loggedInId }] = useViewer();

	const {
		search: {
			filters: { name, filterSet },
			results,
			searchWizardActive,
		},
		searchDispatch,
	} = useContext(SearchContext);

	const navigate = useNavigate();

	const [getSearchResults, { data: { filteredCandidates } = [], loading: searchResultsLoading }] =
		useCandidateSearch();

	// Update SearchContext with the new results whenever the query returns.
	useEffect(() => {
		if (isEqual(filteredCandidates, results) || !filteredCandidates) return;

		searchDispatch({
			type: 'SET_RESULTS',
			payload: {
				results: filteredCandidates,
			},
		});
	}, [filteredCandidates]);

	const runSearch = (values: SearchFilterSet) => {
		// set the positions array to the jobs array if it's not empty, otherwise use the departments array
		const positions =
			values.positions.jobs && values.positions.jobs.length > 0
				? values.positions.jobs
				: values.positions.departments;

		getSearchResults({
			variables: {
				positions,
				skills: values.skills && values.skills.length > 0 ? values.skills : [],
				unions: values.unions && values.unions.length > 0 ? values.unions : [],
				locations: values.locations && values.locations.length > 0 ? values.locations : [],
				experienceLevels:
					values.experienceLevels && values.experienceLevels.length > 0
						? values.experienceLevels
						: [],
				genderIdentities:
					values.genderIdentities && values.genderIdentities.length > 0
						? values.genderIdentities
						: [],
				racialIdentities:
					values.racialIdentities && values.racialIdentities.length > 0
						? values.racialIdentities
						: [],
				personalIdentities:
					values.personalIdentities && values.personalIdentities.length > 0
						? values.personalIdentities
						: [],
				searchUserId: loggedInId,
			},
		})
			.then(() => {
				onClose();
				navigate('/results');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleSearchReset = () => {
		searchDispatch({
			type: 'RESET_SEARCH_FILTERS',
			payload: {},
		});
	};

	return (
		<>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				placement={'top'}
				isFullHeight={name ? false : true}
			>
				<DrawerOverlay />
				<DrawerContent display={'flex'} flexDirection={'column'} height={'100%'}>
					<DrawerHeader
						bg={'text.dark'}
						color={'text.light'}
						borderBottomWidth={'2px'}
						_light={{
							borderBottomColor: 'text.dark',
						}}
						_dark={{
							borderBottomColor: 'text.light',
						}}
					>
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
							<Heading as={'h2'} variant={'contentTitle'} mb={0} color={'text.light'}>
								Search
							</Heading>
							<IconButton
								icon={<FiX />}
								aria-label={'Close'}
								fontSize={'3xl'}
								onClick={onClose}
								variant={'invisible'}
							/>
						</Stack>
					</DrawerHeader>

					{searchWizardActive ? null : (
						<Accordion allowToggle mb={4} defaultIndex={name ? 0 : undefined}>
							<SearchFilterAccordionItem
								heading={
									<Flex alignItems={'center'}>
										<Icon as={FiUser} mr={2} />
										<Text as={'span'} my={0}>
											Search by Name
										</Text>
									</Flex>
								}
								headingProps={{ fontSize: 'md' }}
								panelProps={{ mb: 0, mt: -2, px: 3 }}
							>
								<SearchFilterName />
							</SearchFilterAccordionItem>
						</Accordion>
					)}

					<Formik
						initialValues={filterSet}
						onSubmit={(values) => {
							runSearch(values);
							searchDispatch({
								type: 'SET_FILTER',
								payload: { filter: { key: 'filterSet', value: values } },
							});
						}}
						enableReinitialize={true}
					>
						{({ submitForm, dirty }) => {
							console.log('dirty', dirty);

							return (
								<Form>
									<DrawerBody pt={0} pb={4} px={{ base: 4, md: 8 }} my={0}>
										<SearchWizardView />
									</DrawerBody>
									<Collapse in={dirty && !name} unmountOnExit={false}>
										<DrawerFooter
											mt={0}
											py={2}
											borderTop={'1px'}
											borderTopColor={'gray.300'}
											_light={{ bgColor: 'gray.300' }}
											_dark={{ bgColor: 'gray.100' }}
										>
											<ButtonGroup w={'full'} justifyContent={'flex-end'}>
												<Button
													colorScheme={'green'}
													onClick={submitForm}
													isDisabled={searchResultsLoading}
													leftIcon={searchResultsLoading ? <Spinner /> : <FiSearch />}
													isLoading={!!searchResultsLoading}
												>
													Search
												</Button>
												<Button
													isDisabled={searchResultsLoading ? true : false}
													colorScheme={'orange'}
													onClick={handleSearchReset}
													leftIcon={<FiRefreshCcw />}
												>
													Reset
												</Button>
											</ButtonGroup>
										</DrawerFooter>
									</Collapse>
								</Form>
							);
						}}
					</Formik>
				</DrawerContent>
			</Drawer>
		</>
	);
}
