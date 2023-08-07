// useUpdateBookmarkedProfiles.ts
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

interface ViewerData {
  viewer: {
    id: string;
    bookmarkedProfileConnections: {
      nodes: { __typename: string; databaseId: number }[];
    };
  };
}

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
        const viewerData = cache.readQuery<ViewerData>({ query: QUERY_VIEWER });
        const updatedViewer = data?.updateBookmarkedProfiles?.viewer;

        if (viewerData && updatedViewer) {
          cache.writeQuery({
            query: QUERY_VIEWER,
            data: {
              viewer: {
                ...viewerData.viewer,
                bookmarkedProfileConnections: {
                  ...viewerData.viewer.bookmarkedProfileConnections,
                  nodes: updatedViewer.bookmarkedProfileConnections.nodes,
                },
              },
            },
          });
        }
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
