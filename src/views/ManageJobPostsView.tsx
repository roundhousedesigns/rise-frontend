import { Box, IconButton, Link, List, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
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
			<Text>Edit your posted jobs here.</Text>
			<UnorderedList>
				{jobs?.map((job) => (
					<ListItem key={job.id}>
						{job.title}
						<Separator />
						<Text as='span' fontSize='sm' color='gray.500'>
							{job.companyName}
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
