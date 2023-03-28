/**
 * useFileUpload hook. Mutation to upload a file for saving on the backend.
 */

import { gql, useMutation } from '@apollo/client';

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
		});
	};

	return { uploadFileMutation, results };
}
