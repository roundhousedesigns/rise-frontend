import React from 'react';
import { Spinner, Heading, List, ListItem, Divider } from '@chakra-ui/react';

import { useCredits } from '@/hooks/queries/useCredits';
import { useAllUsers } from '@/hooks/queries/useUsers';

export default function RandomShit() {
	const { data: creditsData, loading: creditsLoading } = useCredits();
	const { data: usersData } = useAllUsers();

	return (
		<>
			<Heading as="h2">Users</Heading>
			{usersData ? (
				<List>
					{usersData.users.nodes.map((i, index) => (
						<ListItem key={index}>{i.databaseId}</ListItem>
					))}
				</List>
			) : (
				'Bork.'
			)}
			<Divider my={4} />
			<Heading as="h2">Credits</Heading>
			{creditsLoading || !creditsData ? (
				<Spinner />
			) : (
				<List>
					{creditsData.credits.nodes.map((i, index) => (
						<ListItem key={index}>{i.databaseId}</ListItem>
					))}
				</List>
			)}
		</>
	);
}
