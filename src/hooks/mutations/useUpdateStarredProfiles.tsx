import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '../queries/useViewer';

const MUTATE_TOGGLE_STARRED_PROFILE = gql`
	mutation updateStarredProfilesMutation(
		$clientMutationId: String
		$starredProfiles: [Int]
		$loggedInId: Int
	) {
		updateStarredProfiles(
			input: {
				clientMutationId: $clientMutationId
				starredProfiles: $starredProfiles
				loggedInId: $loggedInId
			}
		) {
			clientMutationId
			viewer {
				starredProfileConnections {
					nodes {
						databaseId
					}
				}
			}
		}
	}
`;

const useUpdateStarredProfiles = () => {
	const [mutation, results] = useMutation(MUTATE_TOGGLE_STARRED_PROFILE);

	const updateStarredProfilesMutation = (loggedInId: number, starredProfiles: number[]) => {
		return mutation({
			variables: {
				clientMutationId: 'updateStarredProfilesMutation',
				loggedInId,
				starredProfiles,
			},
			update: (cache, { data }) => {
				const updatedViewer = data?.updateStarredProfiles?.viewer;
				if (updatedViewer) {
					cache.modify({
						id: cache.identify(updatedViewer),
						fields: {
							starredProfileConnections(existingConnections = {}) {
								return {
									...existingConnections,
									nodes: updatedViewer.starredProfileConnections.nodes,
								};
							},
						},
					});
				}
			},
			optimisticResponse: {
				updateStarredProfiles: {
					clientMutationId: 'updateStarredProfilesMutation',
					success: true,
					viewer: {
						__typename: 'User',
						id: loggedInId,
						starredProfileConnections: {
							__typename: 'User_starred_profile_connections_connection',
							nodes: starredProfiles.map((profileId) => ({
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

	return { updateStarredProfilesMutation, results };
};

export default useUpdateStarredProfiles;
