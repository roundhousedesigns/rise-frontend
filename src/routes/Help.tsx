import { Link, Button } from '@chakra-ui/react';
import { FiFlag } from 'react-icons/fi';
import PageView from '../views/PageView';
import Shell from '@layout/Shell';

export default function Help() {
	const EmailButton = () => (
		<Button
			as={Link}
			href={'mailto:support@risetheatre.org'}
			colorScheme='red'
			leftIcon={<FiFlag />}
			size='sm'
		>
			Contact Support
		</Button>
	);

	return (
		<Shell title='Help' actions={<EmailButton />}>
			<PageView postId='959' />
		</Shell>
	);
}
