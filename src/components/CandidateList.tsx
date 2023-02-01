import React, { Key } from 'react';
import { List, ListItem, Text } from '@chakra-ui/react';

import CandidateItem from './common/CandidateItem';
import { Candidate } from '../lib/classes';

interface Props {
	candidates: Candidate[];
}

export default function CandidateList({ candidates }: Props): JSX.Element {
	return candidates ? (
		<List alignItems='left' height='auto' width='full' gap={4} display='flex' flexWrap='wrap'>
			{candidates.map((candidate: Candidate, index: Key) => (
				<ListItem key={index} width='full'>
					<CandidateItem candidate={candidate} />
				</ListItem>
			))}
		</List>
	) : (
		<Text>No candidates to show.</Text>
	);
}
