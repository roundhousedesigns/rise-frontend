import React from 'react';
import { Grid, GridItem, Heading } from '@chakra-ui/react';

import GridCard from '@/components/common/GridCard';
import SearchList from '@/components/common/SearchList';
import CandidateList from '@/components/CandidateList';

export default function DashboardView() {
	return (
		<>
			<Heading variant="pageTitle">Hi, Firstname!</Heading>
			<Grid variant="cards" templateColumns="2" templateRows="2" gap={6}>
				<GridItem colSpan={2}>
					<GridCard heading="Saved candidates">
						<CandidateList />
					</GridCard>
				</GridItem>
				<GridItem colSpan={{ base: 2, sm: 1 }}>
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
				<GridItem colSpan={{ base: 2, sm: 1 }}>
					<GridCard heading="Recent Searches">
						<SearchList
							items={[
								'Saved search one',
								'Saved search two',
								'Saved search three',
							]}
						/>
					</GridCard>
				</GridItem>
			</Grid>
		</>
	);
}
