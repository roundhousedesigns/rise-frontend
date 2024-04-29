// useUpdateBookmarkedProfiles.ts
import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '@hooks/queries/useViewer';

const MUTATE_TOGGLE_BOOKMARKED_PROFILE = gql`
	mutation updateBookmarkedProfilesMutation(
		$clientMutationId: String
		$bookmarkedProfiles: [Int]
		$loggedInId: Int
	) {
		updateBookmarkedProfiles(
			input: {
				clientMutationId: $clientMutationId
				bookmarkedProfiles: $bookmarkedProfiles
				loggedInId: $loggedInId
			}
		) {
			clientMutationId
			viewer {
				bookmarkedProfileConnections {
					nodes {
						databaseId
					}
				}
			}
		}
	}
`;

const useUpdateBookmarkedProfiles = () => {
	const [mutation, results] = useMutation(MUTATE_TOGGLE_BOOKMARKED_PROFILE);

	const updateBookmarkedProfilesMutation = (
		loggedInId: number,
		updatedBookmarkedProfiles: number[]
	) => {
		return mutation({
			variables: {
				clientMutationId: 'updateBookmarkedProfilesMutation',
				loggedInId,
				bookmarkedProfiles: updatedBookmarkedProfiles,
			},
			refetchQueries: [
				{
					query: QUERY_VIEWER,
				},
			],
		});
	};

	return { updateBookmarkedProfilesMutation, results };
};

export default useUpdateBookmarkedProfiles;
