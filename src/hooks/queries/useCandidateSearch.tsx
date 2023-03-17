/**
 * useCandidateSearch hook. Query candidates (users) based on selected search parameters.
 *
 * // TODO Document me.
 */

import { gql, LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';

export const QUERY_CANDIDATES = gql`
	query FilteredCandidates(
		$skills: [ID] = []
		$jobs: [ID] = []
		$unions: [ID] = []
		$locations: [ID] = []
		$experienceLevels: [ID] = []
		$genderIdentities: [ID] = []
		$racialIdentities: [ID] = []
		$personalIdentities: [ID] = []
		$exclude: [ID] = []
	) {
		filteredCandidates(
			skills: $skills
			jobs: $jobs
			unions: $unions
			locations: $locations
			experienceLevels: $experienceLevels
			genderIdentities: $genderIdentities
			racialIdentities: $racialIdentities
			personalIdentities: $personalIdentities
			exclude: $exclude
		)
	}
`;

/**
 * useCandidateSearch hook.
 *
 * Queries candidates (users) based on selected search parameters.
 *
 * @returns {Array} The useLazyQuery return tuple.
 */
export const useCandidateSearch = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_CANDIDATES);
};
