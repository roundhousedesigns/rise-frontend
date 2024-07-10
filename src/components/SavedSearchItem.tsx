import { useContext, useEffect, useRef, useState } from 'react';
import {
	useDisclosure,
	useToast,
	Stack,
	StackItem,
	Flex,
	Text,
	Card,
	Button,
	Box,
	Skeleton,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiSearch, FiDelete, FiEdit2, FiSave, FiPlusCircle } from 'react-icons/fi';
import { extractSearchTermIds } from '@lib/utils';
import { SearchFilterSet } from '@lib/classes';
import { SearchContext } from '@context/SearchContext';
import SearchDrawerContext from '@context/SearchDrawerContext';
import useCandidateSearch from '@hooks/queries/useCandidateSearch';
import useTaxonomyTerms from '@hooks/queries/useTaxonomyTerms';
import { useSavedSearchFiltersChanged } from '@hooks/hooks';
import useViewer from '@hooks/queries/useViewer';
import useDeleteOwnSavedSearch from '@hooks/mutations/useDeleteOwnSavedSearch';
import useSaveSearch from '@hooks/mutations/useSaveSearch';
import SearchParamTags from '@common/SearchParamTags';
import ConfirmActionDialog from '@common/ConfirmActionDialog';
import LinkWithIcon from '@common/LinkWithIcon';
import EditSavedSearchModal from '@components/EditSavedSearchModal';

interface Props {
	id?: number;
	title?: string;
	searchTerms: SearchFilterSet;
	showControls?: boolean;
	showSaveButton?: boolean;
	[prop: string]: any;
}

export default function SavedSearchItem({
	id,
	title,
	searchTerms,
	showControls = true,
	showSaveButton = false,
	...props
}: Props) {
	const { loggedInId } = useViewer();
	const [_ignored, { data: { filteredCandidates } = [] }] = useCandidateSearch();
	const {
		search: { results },
		searchDispatch,
	} = useContext(SearchContext);

	const { openDrawer, drawerIsOpen } = useContext(SearchDrawerContext);

	const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
	const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
	const { deleteOwnSavedSearchMutation } = useDeleteOwnSavedSearch();

	const [saveNewSearch, setSaveNewSearch] = useState<boolean>(false);
	const savedSearchFiltersChanged = useSavedSearchFiltersChanged();

	const [whichButtonClicked, setWhichButtonClicked] = useState<string>('');

	const {
		saveSearchMutation,
		results: { loading: saveLoading },
	} = useSaveSearch();

	// Get all the term IDs from the params object.
	const termIds = extractSearchTermIds(searchTerms);
	const [terms] = useTaxonomyTerms(termIds);

	const searchFilterSet = useRef(searchTerms);

	useEffect(() => {
		if (!isEqual(searchTerms, searchFilterSet.current)) return;

		searchFilterSet.current = new SearchFilterSet(searchTerms, terms);
	}, [JSON.stringify(searchTerms)]);

	const toast = useToast();

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

	const handleSearchClick = () => {
		setWhichButtonClicked('search');

		searchDispatch({
			type: 'RESTORE_SAVED_SEARCH',
			payload: {
				savedSearchId: id,
				filterSet: searchFilterSet.current,
			},
		});

		const filterDepartment = document.getElementById('filterDepartment');
		if (filterDepartment) {
			filterDepartment.scrollIntoView({ behavior: 'smooth' });
		}

		if (!drawerIsOpen) openDrawer();
	};

	const handleEditTitleClick = () => {
		editOnOpen();
	};

	const handleSaveNewSearchClick = () => {
		setWhichButtonClicked('new');

		setSaveNewSearch(true);
		editOnOpen();
	};

	const handleUpdateClick = () => {
		setWhichButtonClicked('update');

		if (!title) return;

		saveSearchMutation({
			userId: loggedInId,
			title,
			filterSet: searchFilterSet.current.toQueryableFilterSet(),
			id: saveNewSearch ? undefined : id,
		})
			.then((results) => {
				const {
					data: {
						updateOrCreateSavedSearch: { id },
					},
				} = results;

				searchDispatch({
					type: 'SET_SAVED_SEARCH_FILTERS',
					payload: {
						filterSet: searchFilterSet.current,
						savedSearchId: id,
					},
				});
			})
			.then(() => {
				editOnClose();

				setSaveNewSearch(false);

				toast({
					title: 'Saved!',
					description: 'You can recall your saved searches later from the Search drawer.',
					position: 'bottom',
					status: 'success',
					duration: 3000,
					isClosable: true,
				});

				setWhichButtonClicked('');
			});
	};

	const handleDelete = () => {
		setWhichButtonClicked('delete');

		if (!id) return;

		deleteOwnSavedSearchMutation(id.toString(), loggedInId).then(() => {
			deleteOnClose();

			toast({
				title: 'Deleted!',
				description: 'This saved search has been deleted.',
				position: 'bottom',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		});
	};

	const handleEditClose = () => {
		setWhichButtonClicked('');

		editOnClose();
	};

	return termIds && termIds.length > 0 ? (
		<Card p={0} my={0} {...props}>
			<Flex justifyContent='space-between'>
				<Stack w='auto' alignItems='space-between' p={2}>
					<StackItem>
						<Flex alignItems='flex-end'>
							<LinkWithIcon
								onClick={handleEditTitleClick}
								icon={FiEdit2}
								fontSize='lg'
								mb={1}
								flex={1}
								iconSide='left'
								color='inherit'
								borderBottomWidth='2px'
								borderBottomStyle='dotted'
								textDecoration='none !important'
								_light={{
									borderBottomColor: 'gray.300',
									_hover: { borderBottomColor: 'gray.400' },
								}}
								_dark={{
									borderBottomColor: 'gray.600',
									_hover: { borderBottomColor: 'gray.400' },
								}}
								iconProps={{ boxSize: 4, mb: '2px', ml: 1, position: 'relative', top: '2px' }}
							>
								{title ? (
									title
								) : (
									<Text as='span' opacity='0.5' lineHeight='normal'>
										Save this search
									</Text>
								)}
							</LinkWithIcon>
						</Flex>
					</StackItem>
					<StackItem as={Flex} w='full' justifyContent='space-between' flexWrap='wrap' gap={6}>
						<Skeleton isLoaded={!!terms}>
							<SearchParamTags termIds={termIds} termItems={terms} flex='1' />
						</Skeleton>
					</StackItem>
				</Stack>
				{id ? (
					<Box p={2}>
						{showControls ? (
							<Stack>
								<Button
									leftIcon={<FiSearch />}
									aria-label='Search these filters'
									title='Search these filters'
									size='xs'
									w='100%'
									colorScheme='green'
									onClick={handleSearchClick}
								>
									Search
								</Button>
								<Button
									leftIcon={<FiDelete />}
									aria-label='Delete this search'
									title='Delete'
									size='xs'
									w='100%'
									colorScheme='red'
									onClick={deleteOnOpen}
								>
									Delete
								</Button>
							</Stack>
						) : savedSearchFiltersChanged ? (
							<Stack textAlign='center'>
								<Button
									colorScheme={'yellow'}
									leftIcon={<FiSave />}
									aria-label='Update saved filters'
									title='Update saved filters'
									onClick={handleUpdateClick}
									size='sm'
									isLoading={saveLoading && whichButtonClicked === 'update'}
									isDisabled={saveLoading}
								>
									Update
								</Button>
								<Button
									colorScheme={'blue'}
									leftIcon={<FiPlusCircle />}
									aria-label='Update saved filters'
									title='Update saved filters'
									onClick={handleSaveNewSearchClick}
									size='sm'
									isLoading={saveLoading && whichButtonClicked === 'new'}
									isDisabled={saveLoading}
								>
									Save New
								</Button>
							</Stack>
						) : (
							false
						)}
					</Box>
				) : (
					false
				)}
			</Flex>

			<EditSavedSearchModal
				id={id && !saveNewSearch ? id : 0}
				title={title ? title : ''}
				isOpen={editIsOpen}
				onClose={handleEditClose}
				searchTerms={searchFilterSet.current}
			/>

			<ConfirmActionDialog
				confirmAction={handleDelete}
				isOpen={deleteIsOpen}
				onClose={deleteOnClose}
				headerText='Delete this search'
			>
				Are you sure you want to delete this saved search?
			</ConfirmActionDialog>
		</Card>
	) : null;
}
