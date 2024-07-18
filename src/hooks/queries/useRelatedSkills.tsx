/**
 * useRelatedSkills hook.
 *
 * Queries `skill` terms related to a job (`position` taxonomy)
 *
 * @param {Array} jobs - An array of job IDs.
 * @returns {Array} A tuple of a prepared data object and a query result object.
 *
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPItemParams } from '@lib/types';
import { WPItem } from '@lib/classes';
import { sortWPItemsByName } from '@lib/utils';

export const QUERY_RELATED_SKILLS = gql`
	query RelatedSkillsQuery($jobs: [ID!]) {
		jobSkills(jobs: $jobs) {
			id: databaseId
			name
			slug
		}
	}
`;

/**
 * useRelatedSkills hook.
 *
 * Queries `skill` terms related to a job (`position` taxonomy)
 *
 * @param {Array} jobs - An array of job IDs.
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */
const useRelatedSkills = (jobs: string[] = []): [WPItem[], any] => {
	const result = useQuery(QUERY_RELATED_SKILLS, {
		variables: {
			jobs,
		},
		skip: !jobs.length,
	});

	const preparedResult = result.data?.jobSkills.map((skill: WPItemParams) => new WPItem(skill));
	preparedResult?.sort(sortWPItemsByName);

	return [preparedResult, omit(result, ['data'])];
};

export default useRelatedSkills;
