/**
 * useResumePreview hook. Query to retrieve resume previews.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPAttachment } from '@lib/classes';

export const QUERY_RESUME_PREVIEW = gql`
	query MediaItemQuery($id: ID!) {
		mediaItem(id: $id, idType: SOURCE_URL) {
			id: databaseId
			sourceUrl(size: LARGE)
		}
	}
`;

/**
 * Query to retrieve a resume previews and sourceURL
 *
 * @param {string} resumeUrl - The URL of the resume to retrieve.
 * @returns {attachment: WPAttachment | null, result: any} attachment: The attachment object. result: The query result.
 */

const useResumePreview = (resumeUrl?: string): { attachment: WPAttachment | null; result: any } => {
	const result = useQuery(QUERY_RESUME_PREVIEW, {
		variables: {
			id: resumeUrl,
		},
		skip: !resumeUrl,
	});

	const attachment = result.data?.mediaItem ? new WPAttachment(result.data.mediaItem) : null;

	return { attachment, result: omit(result, ['data']) };
};

export default useResumePreview;
