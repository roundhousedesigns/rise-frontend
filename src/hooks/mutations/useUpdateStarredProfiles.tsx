// useUpdateStarredProfiles.ts
import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '@hooks/queries/useViewer';

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

	const updateStarredProfilesMutation = (
		loggedInId: number,
		updatedStarredProfiles: number[]
	) => {
		return mutation({
			variables: {
				loggedInId,
				starredProfiles: updatedStarredProfiles,
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
