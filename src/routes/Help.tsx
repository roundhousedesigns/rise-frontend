import { Link } from '@chakra-ui/layout';
import Page from '../components/Page';
import ContentView from '../views/ContentView';
import { Button } from '@chakra-ui/button';

export default function Help() {
	const EmailButton = () => (
		<Button as={Link} href='mailto:support@risetheatre.org' colorScheme='orange'>
			Contact Support
		</Button>
	);

	return (
		<Page title='Help' actions={<EmailButton />}>
			<ContentView postId='959' />
		</Page>
	);
}
