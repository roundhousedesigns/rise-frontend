/**
 * useCandidateSearch hook.
 *
 * Queries candidates (users) based on selected search parameters.
 *
 * @returns {Array} The useLazyQuery return tuple.
 *
 */

import { gql, LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';

const QUERY_CANDIDATES = gql`
	query FilteredCandidates(
		$positions: [ID] = []
		$skills: [ID] = []
		$unions: [ID] = []
		$locations: [ID] = []
		$experienceLevels: [ID] = []
		$genderIdentities: [ID] = []
		$racialIdentities: [ID] = []
		$personalIdentities: [ID] = []
		$searchUserId: ID = ""
	) {
		filteredCandidates(
			positions: $positions
			skills: $skills
			unions: $unions
			locations: $locations
			experienceLevels: $experienceLevels
			genderIdentities: $genderIdentities
			racialIdentities: $racialIdentities
			personalIdentities: $personalIdentities
			searchUserId: $searchUserId
		) {
			id: user_id
			score
		}
	}
`;

/**
 * useCandidateSearch hook.
 *
 * Queries candidates (users) based on selected search parameters.
 *
 * @returns {Array} The useLazyQuery return tuple.
 */
const useCandidateSearch = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_CANDIDATES, {
		fetchPolicy: 'network-only',
	});
};

export default useCandidateSearch;
