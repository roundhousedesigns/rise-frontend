import React from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';

export default function DashboardView() {
	return (
		<Container w="full">
			<Heading as="h1">Dashboard!</Heading>
			<Text>Allll your stufffff</Text>
		</Container>
	);

	// Blank search
	//
	// columns:
	//   <SearchList items={recentSearches} />
	//   <SearchList items={savedSearches} />
	//
	// <CrewMemberList items={savedCandidates} />
}
