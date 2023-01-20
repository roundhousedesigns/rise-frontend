import React from 'react';
import { Grid, GridItem, Heading } from '@chakra-ui/react';
import GridCard from '@/components/common/GridCard';
import SearchList from '@/components/common/SearchList';

export default function DashboardView() {
	return (
		<>
			<Heading variant="pageTitle">Dashboard!</Heading>

			<Grid variant="cards" templateColumns="2" templateRows="2" gap={4} my={4}>
				<GridItem colSpan={2}>
					<GridCard heading="Saved candidates">People!</GridCard>
				</GridItem>
				<GridItem w="full">
					<GridCard heading="Saved Searches">
						<SearchList
							items={[
								'Recent search one',
								'Recent search two',
								'Recent search three',
							]}
						/>
					</GridCard>
				</GridItem>
				<GridCard heading="Recent Searches">
					<SearchList
						items={[
							'Saved search one',
							'Saved search two',
							'Saved search three',
						]}
					/>
				</GridCard>
			</Grid>
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
