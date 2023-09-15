/**
 * useSaveSearch hook. Mutation to save a search filter set.
 */

import { gql, useMutation } from '@apollo/client';
import { SearchFilterSetRaw } from '../../lib/types';
import { QUERY_VIEWER } from '../queries/useViewer';

const MUTATE_SAVE_SEARCH = gql`
	mutation SaveSearchFilters($input: SaveSearchFiltersInput = {}) {
		saveSearchFilters(input: $input) {
			success
			clientMutationId
		}
	}
`;

const useSaveSearch = () => {
	const [mutation, results] = useMutation(MUTATE_SAVE_SEARCH, {
		refetchQueries: [QUERY_VIEWER],
	});

	const saveSearchFiltersMutation = ({
		filterSet,
		oldSearchName,
		searchName,
		searchUserId,
	}: {
		filterSet: SearchFilterSetRaw;
		oldSearchName?: string;
		searchName: string;
		searchUserId: number;
	}) => {
		return mutation({
			variables: {
				input: {
					filterSet,
					oldSearchName,
					searchName,
					searchUserId,
				},
			},
		});
	};

	return { saveSearchFiltersMutation, results };
};

export default useSaveSearch;
