import { Card, Box, Heading, Stack, Button } from '@chakra-ui/react';
import { FiEdit3, FiLifeBuoy, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useViewer from '../hooks/queries/useViewer';
import useUserNotices from '../hooks/queries/useUserNotices';

export default function DashboardView() {
	const { loggedInSlug } = useViewer();
	const [notices] = useUserNotices();

	return (
		<Card mt={4}>
			<Heading as='h3' variant='contentTitle' mb={0}>
				To start a Search, use the button in the header!
			</Heading>
			<Stack direction={['column', 'row']} spacing={4} alignItems={['left', 'center']}>
				<Heading as='h4' variant='contentTitle' my={0} lineHeight='normal'>
					You can also:
				</Heading>
				<Button
					as={Link}
					to={`/profile/${loggedInSlug}`}
					leftIcon={<FiUser />}
					colorScheme='green'
					my={0}
				>
					View your profile
				</Button>
				<Button as={Link} to='/profile/edit' colorScheme='green' my={0} leftIcon={<FiEdit3 />}>
					Edit your profile
				</Button>
			</Stack>
			<Box mt={4}>
				<Heading as='h4' variant='contentTitle'>
					Need a little guidance?
				</Heading>
				<Button as={Link} to='/help' colorScheme='orange' leftIcon={<FiLifeBuoy />}>
					Get Help
				</Button>
			</Box>
		</Card>
	);
}
