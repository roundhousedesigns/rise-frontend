import {
	Card,
	Heading,
	Button,
	Flex,
	Spacer,
	List,
	ListItem,
	Stack,
	StackItem,
} from '@chakra-ui/react';
import { FiEdit3, FiSearch, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useViewer from '@queries/useViewer';
import useUserNotices from '@queries/useUserNotices';
import ShortPost from '@components/ShortPost';
import InlineIconText from '@components/InlineIconText';

export default function DashboardView() {
	const [{ loggedInSlug }] = useViewer();
	const [notices] = useUserNotices();

	return (
		<Stack direction='column'>
			<StackItem as={Card}>
				<Flex justifyContent='space-between' flexWrap='wrap' mb={2}>
					<InlineIconText
						icon={<FiSearch />}
						text='To start a Search, use the star button in the header.'
						query='star'
						description='search'
					/>
					<Flex gap={4} w='full' flexWrap='wrap' mt={4}>
						<Button
							as={Link}
							leftIcon={<FiUser />}
							to={`/profile/${loggedInSlug}`}
							colorScheme='blue'
							my={0}
						>
							View your profile
						</Button>
						<Button as={Link} leftIcon={<FiEdit3 />} to='/profile/edit' colorScheme='green' my={0}>
							Edit your profile
						</Button>
						<Spacer />
					</Flex>
				</Flex>
			</StackItem>

			{notices.length > 0 ? (
				<StackItem>
					<Heading as='h2' variant='pageSubtitle'>
						Updates
					</Heading>
					<List spacing={6} mt={4}>
						{notices.map((notice: any) => (
							<ListItem as={Card} key={notice.id} my={0} p={0}>
								<ShortPost post={notice} />
							</ListItem>
						))}
					</List>
				</StackItem>
			) : null}
		</Stack>
	);
}
