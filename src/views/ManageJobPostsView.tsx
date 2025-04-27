import { Box, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { JobPost } from '@lib/classes';
import useViewer from '@queries/useViewer';

interface ManageJobPostsViewProps {
	jobs: JobPost[];
}

const Separator = () => (
	<Text as='span' fontSize='sm' color='gray.500'>
		{' | '}
	</Text>
);

export default function ManageJobPostsView({ jobs }: ManageJobPostsViewProps) {
	const [{ loggedInId }] = useViewer();

	return (
		<Box>
			<Text fontSize='lg'>Edit your posted jobs here.</Text>
			<UnorderedList spacing={2}>
				{jobs?.map((job) => (
					<ListItem key={job.id} fontSize='md'>
						{job.title}
						<Separator />
						<Text as='span' fontSize='sm' color='gray.500'>
							{job.companyName}
						</Text>
						<Separator />
						<Text as='span' fontSize='sm' color='gray.500' fontStyle='italic'>
							{job.status === 'publish' ? 'published' : 'pending'}
						</Text>
						{loggedInId === job.author && (
							<>
								<Separator />
								<Link as={RouterLink} to={`/jobs/edit/${job.id}`}>
									Edit
								</Link>
							</>
						)}
					</ListItem>
				))}
			</UnorderedList>
		</Box>
	);
}
