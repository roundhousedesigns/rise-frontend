import React from 'react';
import { List, ListItem } from '@chakra-ui/react';

import Candidate from '@/components/common/Candidate';
import { simpleWordsArray } from '@/dummydata';

// TODO This will either take a prop containing a collection of Crew Members,
// or it will access it from a store.
//
// For now, it just shoots blanks.
export default function CandidateList() {
	return (
		<List
			// justifyContent="flex-start"
			alignItems="left"
			height="auto"
			width="full"
			gap={4}
			display="flex"
			flexWrap="wrap"
		>
			{simpleWordsArray(5).map((i) => (
				<ListItem key={i} width="full">
					<Candidate item={i} />
				</ListItem>
			))}
		</List>
	);
}
