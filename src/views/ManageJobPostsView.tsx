import { useMemo } from 'react';
import { Box, Heading, Link, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
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

	const { pendingJobs, publishedJobs } = useMemo(() => {
		return jobs.reduce(
			(acc: { pendingJobs: JobPost[]; publishedJobs: JobPost[] }, job) => {
				if (job.status === 'publish') {
					acc.publishedJobs.push(job);
				} else {
					acc.pendingJobs.push(job);
				}
				return acc;
			},
			{ pendingJobs: [], publishedJobs: [] }
		);
	}, [jobs]);

	return (
		<Box>
			<Text fontSize='md'>
				You may edit any of your job posts that are still pending. Once your post is approved, you
				will no longer be able to edit it.
			</Text>

			<Stack direction='column' spacing={4}>
				<Box>
					<Heading size='lg'>Pending Job Posts</Heading>
					<UnorderedList spacing={2}>
						{pendingJobs?.map((job) => (
							<ListItem key={job.id} fontSize='md'>
								{job.title}
								<Separator />
								<Text as='span' fontSize='sm' color='gray.500'>
									{job.companyName}
								</Text>
								{loggedInId === job.author && job.status === 'pending' && (
									<>
										<Separator />
										<Link as={RouterLink} to={`/jobs/edit/${job.id}`} fontSize='sm'>
											Edit
										</Link>
									</>
								)}
							</ListItem>
						))}
					</UnorderedList>
				</Box>

				<Box>
					<Heading size='lg'>Published Job Posts</Heading>
					<UnorderedList spacing={2}>
						{publishedJobs?.map((job: JobPost) => (
							<ListItem key={job.id} fontSize='md'>
								{job.title}
								<Separator />
								<Text as='span' fontSize='sm' color='gray.500'>
									{job.companyName}
								</Text>
								<Separator />
								<Text fontSize='sm' color='gray.500' as='span'>
									--expires in xx days--
								</Text>
							</ListItem>
						))}
					</UnorderedList>
				</Box>
			</Stack>
		</Box>
	);
}
