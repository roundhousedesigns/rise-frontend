import { Flex, List, ListItem, ListProps, SimpleGrid, Text } from '@chakra-ui/react';
import { JobPost } from '@lib/classes';
import JobPostListItem from '@common/JobPostListItem';

interface Props {
	jobs: JobPost[];
}

export default function JobPostsList({ jobs, ...props }: Props & ListProps) {
	return jobs.length > 0 ? (
		<List as={Flex} gap={4} flexWrap='wrap' {...props}>
			{jobs.map((job) => (
				<ListItem key={job.id} flex={1} maxW='50%'>
					<JobPostListItem job={job} />
				</ListItem>
			))}
		</List>
	) : (
		<Text>No jobs found matching your filters.</Text>
	);
}
