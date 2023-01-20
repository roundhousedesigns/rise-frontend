import React from 'react';
import { Box, Text, Heading, List, ListItem, Divider } from '@chakra-ui/react';

import { useCredits } from '@/hooks/queries/useCredits';
import { useAllUsers } from '@/hooks/queries/useUsers';

export default function Main() {
	const { data: creditsData, error: creditsErrors } = useCredits();
	const { data: usersData, error: usersErrors } = useAllUsers();

	return (
		<Box
			w="full"
			h="fill"
			background="none"
			align="center"
			justifyContent="center"
			p={8}
		>
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
			{creditsData ? (
				<List>
					{creditsData.credits.nodes.map((i, index) => (
						<ListItem key={index}>{i.databaseId}</ListItem>
					))}
				</List>
			) : (
				'No credits'
			)}
		</Box>
	);
}
