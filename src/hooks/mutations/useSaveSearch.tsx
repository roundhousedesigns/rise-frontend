/**
 * useSaveSearch hook. Mutation to save a search filter set.
 */

import { gql, useMutation } from '@apollo/client';
import { SearchFilterSetRaw } from '@lib/types';
import { QUERY_SAVED_SEARCHES } from '@hooks/queries/useSavedSearches';

const MUTATE_UPDATE_SAVED_SEARCH = gql`
	mutation SaveSearch($filterSet: SearchFilterSetRaw!, $id: ID!, $title: String!, $userId: ID!) {
		updateOrCreateSavedSearch(
			input: { filterSet: $filterSet, id: $id, title: $title, userId: $userId }
		) {
			id
		}
	}
`;

const useSaveSearch = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_SAVED_SEARCH);

	const saveSearchMutation = ({
		id,
		title,
		filterSet,
		userId,
	}: {
		id?: number;
		title: string;
		filterSet: SearchFilterSetRaw;
		userId: number;
	}) => {
		return mutation({
			variables: {
				id: id ? id : 0,
				title,
				filterSet,
				userId,
			},
			refetchQueries: [{ query: QUERY_SAVED_SEARCHES, variables: { author: userId } }],
		});
	};

	return { saveSearchMutation, results };
};

export default useSaveSearch;
