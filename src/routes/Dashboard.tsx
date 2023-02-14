import { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import Page from '../components/Page';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
	const { loggedInUser } = useContext(AuthContext);

	return (
		<Page title={`Hi, ${loggedInUser.firstName}!`}>
			<Text>Stuff!</Text>
		</Page>
	);
}
