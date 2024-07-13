import { gql, useMutation } from '@apollo/client';
import useViewer, { QUERY_VIEWER } from '@hooks/queries/useViewer';

const MUTATE_TOGGLE_STARRED_PROFILE = gql`
	mutation updateStarredProfilesMutation($toggledId: Int!, $loggedInId: Int!) {
		updateStarredProfiles(input: { toggledId: $toggledId, loggedInId: $loggedInId }) {
			viewer {
				starredProfiles {
					nodes {
						databaseId
					}
				}
			}
			toggledId
		}
	}
`;

const useUpdateStarredProfiles = () => {
	const { loggedInId } = useViewer();
	const [mutation, results] = useMutation(MUTATE_TOGGLE_STARRED_PROFILE);

	const updateStarredProfilesMutation = (toggledId: number) => {
		if ( ! loggedInId ) console.info('WAHTTTT');
		return mutation({
			variables: {
				loggedInId,
				toggledId,
			},
			refetchQueries: [
				{
					query: QUERY_VIEWER,
				},
			],
		});
	};

	console.info('results', results);

	return { updateStarredProfilesMutation, results };
};

export default useUpdateStarredProfiles;
