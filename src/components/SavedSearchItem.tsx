import { useContext, useEffect, useRef } from 'react';
import {
	useDisclosure,
	useToast,
	Stack,
	StackItem,
	Flex,
	Text,
	Card,
	Button,
} from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { FiSearch, FiDelete, FiEdit2 } from 'react-icons/fi';
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
		<Card p={0} _first={{ mt: 0 }}>
			<Flex justifyContent='space-between'>
				<Stack w='auto' alignItems='space-between' p={2} {...props}>
					<StackItem>
						<Flex alignItems='flex-end'>
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
										Name this search
									</Text>
								)}
							</LinkWithIcon>
						</Flex>
					</StackItem>
					<StackItem as={Flex} w='full' justifyContent='space-between' flexWrap='wrap' gap={6}>
						<SearchParamTags termIds={termIds} termItems={terms} flex='1' />
					</StackItem>
				</Stack>
				{id && showControls ? (
					<Stack alignItems='center' justifyContent='fill' p={2} spacing={2}>
						<Button
							leftIcon={<FiSearch />}
							aria-label='Search these filters'
							title='Search these filters'
							size='xs'
							w='100%'
							colorScheme='gray'
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
							onClick={deleteOnOpen}
						>
							Delete
						</Button>
					</Stack>
				) : (
					false
				)}
			</Flex>

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
		</Card>
	) : null;
}
