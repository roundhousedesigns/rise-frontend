/**
 * useLazyRelatedSkills hook.
 *
 * Returns a function, that when called with an array of jobIds makes a query to get all related skills.
 */

import { LazyQueryExecFunction, QueryResult, useLazyQuery } from '@apollo/client';
import { QUERY_RELATED_SKILLS } from '@queries/useRelatedSkills';

/**
 * useLazyRelatedSkills hook.
 *
 * Queries `skill` terms related to a job (`position` taxonomy)
 *
 * @returns {Array} The useLazyQuery return tuple.
 */
const useLazyRelatedSkills = (): [LazyQueryExecFunction<any, any>, QueryResult] => {
	return useLazyQuery(QUERY_RELATED_SKILLS);
};

export default useLazyRelatedSkills;
