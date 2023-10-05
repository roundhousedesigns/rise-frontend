import {
	Card,
	Box,
	Heading,
	Button,
	Flex,
	Text,
	Spacer,
	List,
	ListItem,
	IconButton,
} from '@chakra-ui/react';
import { FiEdit3, FiLifeBuoy, FiSearch, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useViewer from '@hooks/queries/useViewer';
import useUserNotices from '../hooks/queries/useUserNotices';
import ShortPost from '../components/common/ShortPost';
import SearchHistory from '../components/SearchHistory';
import SavedSearches from '../components/SavedSearches';

export default function DashboardView() {
	const { loggedInSlug } = useViewer();
	const [notices] = useUserNotices();

	return (
		<Box>
			<Card mb={0}>
				<Flex justifyContent='space-between' flexWrap='wrap' mb={2}>
					<Text fontSize='xl' my={0} display='flex' alignItems='center' flexWrap='wrap'>
						To start a Search, use the{' '}
						{
							<IconButton
								icon={<FiSearch />}
								variant='inline'
								title='Search'
								aria-label='Sample magnifying glass search icon'
							/>
						}{' '}
						button in the header.
					</Text>
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
						<Button leftIcon={<FiLifeBuoy />} as={Link} to='/help' colorScheme='orange'>
							Get Help
						</Button>
					</Flex>
				</Flex>
			</Card>

			<Flex flexWrap='wrap' mb={2} gap={4}>
				<Card flex='0 1 400px'>
					<SavedSearches />
				</Card>
				<Card flex='0 1 400px'>
					<SearchHistory />
				</Card>
			</Flex>

			{notices && notices.length > 0 && (
				<Box>
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
				</Box>
			)}
		</Box>
	);
}
