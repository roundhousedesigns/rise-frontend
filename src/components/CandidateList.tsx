import { List, ListItem, Spinner, Text } from '@chakra-ui/react';
import useCandidates from '@queries/useCandidates';
import ErrorAlert from '@common/ErrorAlert';
import CandidateItem from '@components/CandidateItem';

interface Props {
	userIds: number[];
	inOrder?: boolean;
}

export default function CandidateList({ userIds, inOrder }: Props): JSX.Element {
	const [preparedCandidates, { loading, error }] = useCandidates(userIds);

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : !preparedCandidates?.length ? (
				<Text>No profiles to show.</Text>
			) : (
				<List alignItems='left' h='auto' w='full' spacing={4}>
					{inOrder
						? userIds.map((id) => {
								const candidate = preparedCandidates.find((candidate) => candidate.id === id);
								return candidate ? (
									<ListItem key={id}>
										<CandidateItem candidate={candidate} />
									</ListItem>
								) : null;
						  })
						: preparedCandidates.map((candidate) => (
								<ListItem key={candidate.id}>
									<CandidateItem candidate={candidate} />
								</ListItem>
						  ))}
				</List>
			)}
		</>
	);
}
