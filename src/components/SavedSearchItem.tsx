import { useContext, useEffect, useRef } from 'react';
import {
	useDisclosure,
	useToast,
	Button,
	Stack,
	StackItem,
	Flex,
	IconButton,
	ButtonGroup,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiSearch, FiSave, FiDelete, FiEdit2, FiAlertTriangle } from 'react-icons/fi';
import { compareSearchFilterSets, extractSearchTermIds, prepareSearchFilterSet } from '@lib/utils';
import { SearchFilterSet } from '@lib/types';
import { SearchContext } from '@context/SearchContext';
import useCandidateSearch from '@hooks/queries/useCandidateSearch';
import useTaxonomyTerms from '@hooks/queries/useTaxonomyTerms';
import useViewer from '@hooks/queries/useViewer';
import useDeleteOwnSavedSearch from '@hooks/mutations/useDeleteOwnSavedSearch';
import SearchParamTags from '@common/SearchParamTags';
import ConfirmActionDialog from '@common/ConfirmActionDialog';
import LinkWithIcon from '@common/LinkWithIcon';
import EditSavedSearchModal from './EditSavedSearchModal';

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
		search: {
			results,
			filters: { filterSet: currentFilterSet },
			savedSearch: { filterSet: savedSearchFilterSet },
		},
		searchDispatch,
	} = useContext(SearchContext);

	const hasName = title && title !== '';

	const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
	const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
	const { deleteOwnSavedSearchMutation } = useDeleteOwnSavedSearch();
	const savedSearchFiltersUntouched = useRef<boolean>(true);

	useEffect(() => {
		savedSearchFiltersUntouched.current = compareSearchFilterSets(
			savedSearchFilterSet,
			currentFilterSet
		);

		return () => {
			savedSearchFiltersUntouched.current = true;
		};
	}, [currentFilterSet, savedSearchFilterSet]);

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

	// Get all the term IDs from the params object.
	const termIds = extractSearchTermIds(searchTerms);
	const [terms] = useTaxonomyTerms(termIds);

	const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const filterSet = prepareSearchFilterSet(searchTerms, terms);

		searchDispatch({
			type: 'RESTORE_SAVED_SEARCH',
			payload: {
				savedSearchId: id,
				filterSet,
			},
		});
	};

	const handleEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		editOnOpen();
	};

	const handleUpdateClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		editOnClose();
	};

	const handleDelete = () => {
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
		editOnClose();
	};

	return termIds && termIds.length > 0 ? (
		<>
			<Stack w='auto' alignItems='space-between' {...props}>
				<StackItem>
					<Flex>
						{hasName ? (
							<LinkWithIcon
								onClick={handleEditClick}
								icon={FiEdit2}
								fontSize='lg'
								my={0}
								flex={1}
								iconSide='left'
								color='inherit'
								borderBottomWidth='2px'
								borderBottomStyle='dotted'
								textDecoration='none !important'
								_hover={{ borderBottom: '1px  dotted brand.blue' }}
								_light={{
									borderBottomColor: 'gray.300',
									_hover: { borderBottomColor: 'gray.400' },
								}}
								_dark={{ borderBottomColor: 'gray.600', _hover: { borderBottomColor: 'gray.400' } }}
								iconProps={{ boxSize: 4, mb: '2px', ml: 1, position: 'relative', top: '2px' }}
							>
								{title}
							</LinkWithIcon>
						) : (
							false
						)}
						{id && showControls ? (
							<ButtonGroup
								alignItems='center'
								justifyContent='space-between'
								flex='0 0 auto'
								size='sm'
								spacing={1}
								ml={4}
							>
								<IconButton
									icon={<FiSearch />}
									colorScheme='green'
									aria-label='Reuse this search'
									title='Reuse this search'
									onClick={handleSearchClick}
								/>
								<IconButton
									icon={<FiDelete />}
									colorScheme='orange'
									aria-label='Delete this search'
									title='Delete'
									onClick={deleteOnOpen}
								/>
							</ButtonGroup>
						) : (
							false
						)}
					</Flex>
				</StackItem>
				<StackItem>
					<Flex w='full' justifyContent='space-between' flexWrap='wrap' gap={2}>
						<SearchParamTags termIds={termIds} termItems={terms} flex='1' />
						{showSaveButton ? (
							!!id ? (
								<Button
									colorScheme={savedSearchFiltersUntouched.current ? 'blue' : 'yellow'}
									leftIcon={savedSearchFiltersUntouched.current ? <FiSave /> : <FiAlertTriangle />}
									aria-label='Update saved filters'
									title='Update saved filters'
									onClick={
										savedSearchFiltersUntouched.current ? handleUpdateClick : handleEditClick
									}
									isDisabled={savedSearchFiltersUntouched.current}
									size='sm'
								>
									Update
								</Button>
							) : (
								<Button
									colorScheme='blue'
									leftIcon={<FiSave />}
									aria-label='Save Search'
									title='Save search'
									onClick={handleEditClick}
									size='sm'
								>
									Save search
								</Button>
							)
						) : (
							false
						)}
					</Flex>
				</StackItem>
			</Stack>

			<EditSavedSearchModal
				id={id ? id : 0}
				title={title ? title : ''}
				isOpen={editIsOpen}
				onClose={handleEditClose}
				searchTerms={searchTerms}
			/>

			<ConfirmActionDialog
				confirmAction={handleDelete}
				isOpen={deleteIsOpen}
				onClose={deleteOnClose}
				headerText='Delete this search'
			>
				Are you sure you want to delete this saved search?
			</ConfirmActionDialog>
		</>
	) : null;
}
