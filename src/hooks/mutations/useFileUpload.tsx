/**
 * useFileUpload hook. Mutation to upload a file for saving on the backend.
 */

import { gql, useMutation } from '@apollo/client';
import { QUERY_PROFILE } from '@queries/useUserProfile';

const UPLOAD_FILE_MUTATION = gql`
	mutation UploadFileMutation($file: Upload!, $name: String!, $userId: ID!) {
		uploadFile(input: { file: $file, name: $name, userId: $userId }) {
			fileUrl
		}
	}
`;

const useFileUpload = () => {
	const [mutation, results] = useMutation(UPLOAD_FILE_MUTATION);

	const uploadFileMutation = (file: File, name: string, userId: number) => {
		return mutation({
			variables: {
				file,
				name,
				userId,
			},
			refetchQueries: [
				{
					query: QUERY_PROFILE,
					variables: { id: userId, author: userId },
					fetchPolicy: 'network-only',
				},
			],
		});
	};

	return { uploadFileMutation, results };
};

export default useFileUpload;
