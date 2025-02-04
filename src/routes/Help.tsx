import { Link, Button } from '@chakra-ui/react';
import { FiFlag } from 'react-icons/fi';
import PageView from '../views/PageView';
import Page from '@components/Page';

export default function Help() {
	const EmailButton = () => (
		<Button
			as={Link}
			href={'mailto:support@risetheatre.org'}
			colorScheme={'red'}
			leftIcon={<FiFlag />}
			size={'sm'}
		>
			Contact Support
		</Button>
	);

	return (
		<Page title={'Help'} actions={<EmailButton />}>
			<PageView postId={'959'} />
		</Page>
	);
}
