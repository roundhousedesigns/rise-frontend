import { gql, useMutation } from '@apollo/client';
import { QUERY_VIEWER } from '@queries/useViewer';

const MUTATE_TOGGLE_STARRED_PROFILE = gql`
	mutation updateStarredProfilesMutation($toggledId: Int!) {
		updateStarredProfiles(input: { toggledId: $toggledId }) {
			starredProfiles
		}
	}
`;

const useUpdateStarredProfiles = () => {
	const [mutation, results] = useMutation(MUTATE_TOGGLE_STARRED_PROFILE);

	const updateStarredProfilesMutation = (toggledId: number) => {
		return mutation({
			variables: {
				toggledId,
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
