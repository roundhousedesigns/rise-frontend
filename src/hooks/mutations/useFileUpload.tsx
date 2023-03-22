/**
 * useUpdateProfile hook. Mutation to update a User.
 */

import { gql, useMutation } from '@apollo/client';

const MUTATE_FILE_UPLOAD = gql`
	mutation UploadFile($file: Upload = "") {
		uploadFile(input: { file: $file }) {
			text
			clientMutationId
		}
	}
`;

export const useFileUpload = () => {
	const [mutation, results] = useMutation(MUTATE_FILE_UPLOAD);

	const uploadFileMutation = (file: File) => {
		return mutation({
			variables: {
				input: {
					clientMutationId: 'uploadFileMutation',
					file,
				},
			},
		});
	};

	return { uploadFileMutation, results };
};
