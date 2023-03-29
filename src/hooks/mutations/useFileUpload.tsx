/**
 * useFileUpload hook. Mutation to upload a file for saving on the backend.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_PROFILE } from '../queries/useUserProfile';

const UPLOAD_FILE_MUTATION = gql`
	mutation UploadFileMutation($file: Upload!, $userId: ID!) {
		uploadFile(input: { file: $file, userId: $userId }) {
			imageUrl
		}
	}
`;

export default function useFileUpload() {
	const [mutation, results] = useMutation(UPLOAD_FILE_MUTATION);

	const uploadFileMutation = (file: File, userId: number) => {
		return mutation({
			variables: {
				file,
				userId,
			},
			refetchQueries: [
				{
					query: QUERY_PROFILE,
				},
			],
		});
	};

	return { uploadFileMutation, results };
}
