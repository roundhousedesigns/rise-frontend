import React from 'react';
import { Container, Heading, Text, Card } from '@chakra-ui/react';
import SearchList from '../components/SearchList';

export default function DashboardView() {
	return (
		<>
			<Heading as="h1">Dashboard!</Heading>
			<Text>Allll your stufffff</Text>

			<Container w="full" align="center">
				<Card my={4}>
					<Heading as='h3'>Saved Searches</Heading>
					<SearchList
						items={[
							'Recent search one',
							'Recent search two',
							'Recent search three',
						]}
					/>
				</Card>
				<Card my={4}>
					<Heading as='h3'>Recent Searches</Heading>
					<SearchList
						items={[
							'Saved search one',
							'Saved search two',
							'Saved search three',
						]}
					/>
				</Card>
			</Container>
		</>
	);

	// Blank search
	//
	// columns:
	//   <SearchList items={recentSearches} />
	//   <SearchList items={savedSearches} />
	//
	// <CrewMemberList items={savedCandidates} />
}
