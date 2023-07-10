import { List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { Candidate } from '../lib/classes';
import CandidateItem from './CandidateItem';
import useCandidates from '../hooks/queries/useCandidates';
import ErrorAlert from './common/ErrorAlert';
import { useState, useEffect } from 'react';

// TODO type remove and add Candidate
interface Props {
	userIds: number[];
	starredProfiles: number[];
	loggedInId: number;
}

// TODO Set up search results pagination in GraphQL

export default function CandidateList({ userIds, starredProfiles, loggedInId }: Props): JSX.Element {
	const [preparedCandidates, { loading, error }] = useCandidates(userIds);
	const [starredCandidates, setStarredCandidates] = useState(starredProfiles);

	console.log('starredProfiles: ', starredProfiles);
	console.log('starredCandidates: ', starredCandidates);
	console.log('preparedCandidates: ', preparedCandidates);

	const removeCandidate = (profileToDelete: number) => {
		console.log('removeCandidate with id: ', profileToDelete)
		setStarredCandidates((starredCandidates) => starredCandidates.filter((profile) => profile !== profileToDelete));
	}

	const addCandidate = (profileToAdd: number) => {
		console.log('addCandidate with id: ', profileToAdd)
	}

	return preparedCandidates && !loading && !error ? (
		<List alignItems='left' h='auto' w='full' gap={4} display='flex' flexWrap='wrap'>
			{preparedCandidates.map((candidate: Candidate) => (
				<ListItem key={candidate.id} w='full'>
					<CandidateItem
						candidate={candidate}
						removeCandidate={removeCandidate}
						addCandidate={addCandidate}
						loggedInId={loggedInId}
						defaultStar={candidate ? starredCandidates.includes(candidate.id) : false} />
				</ListItem>
			))}
		</List>
	) : loading ? (
		<Spinner />
	) : error ? (
		<ErrorAlert message={error.message} />
	) : (
		<Text>No candidates to show.</Text>
	);
}
