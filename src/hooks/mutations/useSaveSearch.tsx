/**
 * useSaveSearch hook. Mutation to save a search filter set.
 */

import { gql, useMutation } from '@apollo/client';
import { SearchFilterSetRaw } from '@lib/types';
import { QUERY_SAVED_SEARCHES } from '../queries/useSavedSearches';

const MUTATE_UPDATE_SAVED_SEARCH = gql`
	mutation SaveSearch($filterSet: SearchFilterSetRaw!, $id: ID!, $title: String!, $userId: ID!) {
		saveSearch(input: { filterSet: $filterSet, id: $id, title: $title, userId: $userId }) {
			id
		}
	}
`;

const useSaveSearch = () => {
	const [mutation, results] = useMutation(MUTATE_UPDATE_SAVED_SEARCH, {
		refetchQueries: [QUERY_SAVED_SEARCHES],
	});

	const saveSearchFiltersMutation = ({
		id,
		title,
		filterSet,
		userId,
	}: {
		id: number;
		title: string;
		filterSet: SearchFilterSetRaw;
		userId: number;
	}) => {
		return mutation({
			variables: {
				id,
				title,
				filterSet,
				userId,
			},
		});
	};

	return { saveSearchFiltersMutation, results };
};

export default useSaveSearch;
