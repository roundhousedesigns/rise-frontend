import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '../queries/useViewer';

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
			update: (cache, { data }) => {
				const updatedViewer = data?.updateBookmarkedProfiles?.viewer;
				if (updatedViewer) {
					cache.modify({
						id: cache.identify(updatedViewer),
						fields: {
							bookmarkedProfileConnections(existingConnections = {}) {
								return {
									...existingConnections,
									nodes: updatedViewer.bookmarkedProfileConnections.nodes,
								};
							},
						},
					});
				}
			},
			optimisticResponse: {
				updateBookmarkedProfiles: {
					clientMutationId: 'updateBookmarkedProfilesMutation',
					success: true,
					viewer: {
						__typename: 'User',
						id: 'temp-id',
						bookmarkedProfileConnections: {
							__typename: 'User_bookmarked_profile_connections_connection',
							nodes: updatedBookmarkedProfiles.map((profileId) => ({
								__typename: 'User',
								databaseId: profileId,
							})),
						},
					},
				},
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
