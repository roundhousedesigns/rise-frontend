import { Card, Box, Heading, Button, Flex, Text, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import useViewer from '../hooks/queries/useViewer';
import useUserNotices from '../hooks/queries/useUserNotices';
import { FiEdit3, FiUser } from 'react-icons/fi';

export default function DashboardView() {
	const { loggedInSlug } = useViewer();
	const [notices] = useUserNotices();

	return (
		<Box>
			<Card mb={8}>
				<Flex justifyContent='space-between' flexWrap='wrap'>
					<Text fontSize='xl' mb={0}>
						To start a Search, use the button in the header!
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
						<Button as={Link} to='/help' colorScheme='orange'>
							Get Help
						</Button>
					</Flex>
				</Flex>
			</Card>
			{notices && notices.length > 0 && (
				<Box>
					<Heading as='h3' variant='contentTitle' mt={4}>
						Notices!
					</Heading>
					<Flex flexWrap='wrap' gap={4}>
						{notices.map((notice: any) => (
							<Card
								key={notice.id}
								my={0}
								flex='0 0 auto'
								w={{ base: 'full', sm: 'auto' }}
								maxW={{ base: 'none', sm: 400 }}
							>
								<Heading as='h4' variant='contentSubtitle'>
									{notice.title}
								</Heading>
								<Box>{parse(notice.content)}</Box>
							</Card>
						))}
					</Flex>
				</Box>
			)}
		</Box>
	);
}
