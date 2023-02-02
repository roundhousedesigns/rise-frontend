import { Heading, Container, List, ListItem } from '@chakra-ui/react';
import Page from '../components/common/Page';
import { useTestUsers } from '../hooks/queries/useTestUsers';

/**
 *
 * Mess around, try queries, draw pictures, it's the scratch pad.
 *
 */

export default function _devScratch() {
	const { data, loading, error } = useTestUsers();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<Page title="Scratch pad">
			<Container>
				<Heading size="lg">Users</Heading>
				<List>
					{data?.users?.nodes?.map(
						(user: {
							id: string;
							firstName: string;
							lastName: string;
							pronouns: string;
						}) => (
							<ListItem
								key={user.id}
							>{`${user.firstName} ${user.lastName} (${user.pronouns})`}</ListItem>
						)
					)}
				</List>
			</Container>
		</Page>
	);
}