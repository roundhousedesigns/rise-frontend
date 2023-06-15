import { Card, Box, Heading, Stack, Button, Divider, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import useViewer from '../hooks/queries/useViewer';
import useGlobalNotices from '../hooks/queries/useGlobalNotices';

export default function DashboardView() {
	const { loggedInSlug } = useViewer();
	const [notices] = useGlobalNotices();

	return (
		<>
			<Card mt={4}>
				<Heading as='h3' variant='contentTitle' mb={0}>
					To start a Search, use the button in the header!
				</Heading>
				<Divider mb={4} />
				<Stack direction={['column', 'row']} spacing={4} alignItems={['left', 'center']}>
					<Button as={Link} to={`/profile/${loggedInSlug}`} colorScheme='green' my={0}>
						View your profile
					</Button>
					<Button as={Link} to='/profile/edit' colorScheme='green' my={0}>
						Edit your profile
					</Button>
				</Stack>
				{/* <Box mt={4}>
					<Heading as='h4' variant='contentTitle'>Need a little guidance?</Heading>
					<Button as={Link} to='/help' colorScheme='orange'>
						Get Help
					</Button>
				</Box> */}
			</Card>
			{notices && notices.length > 0 && (
				<Flex flexWrap='wrap'>
					{notices.map((notice: any) => (
						<Card
							mt={4}
							flex='0 0 auto'
							w={{ base: 'full', sm: 'auto' }}
							maxW={{ base: 'none', sm: 400 }}
						>
							<Heading as='h4' variant='contentSubtitle' key={notice.id}>
								{notice.title}
							</Heading>
							<Box key={notice.id}>{parse(notice.content)}</Box>
						</Card>
					))}
				</Flex>
			)}
		</>
	);
}
