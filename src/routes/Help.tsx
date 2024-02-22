import { Link, Button } from '@chakra-ui/react';
import { FiFlag } from 'react-icons/fi';
import ContentView from '@views/ContentView';
import Page from '@components/Page';

export default function Help() {
	const EmailButton = () => (
		<Button
			as={Link}
			href='mailto:support@risetheatre.org'
			colorScheme='red'
			leftIcon={<FiFlag />}
			size='sm'
		>
			Contact Support
		</Button>
	);

	return (
		<Page title='Help' actions={<EmailButton />}>
			<ContentView postId='959' />
		</Page>
	);
}
