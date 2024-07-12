import { gql, useMutation } from '@apollo/client';
import useViewer, { QUERY_VIEWER } from '@hooks/queries/useViewer';

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
				starredProfiles {
					nodes {
						databaseId
					}
				}
			}
		}
	}
`;

const useUpdateStarredProfiles = () => {
	const { loggedInId } = useViewer();
	const [mutation, results] = useMutation(MUTATE_TOGGLE_STARRED_PROFILE);

	const updateStarredProfilesMutation = (updatedStarredProfiles: number[]) => {
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

	if (results.error) console.error(results.error);

	return { updateStarredProfilesMutation, results };
};

export default useUpdateStarredProfiles;
