import { List, ListProps, Text } from '@chakra-ui/react';
import { JobPost } from '@lib/classes';
import JobPostListItem from '@common/JobPostListItem';

interface Props {
	jobs: JobPost[];
}

export default function JobPostsList({ jobs, ...props }: Props & ListProps) {
	return jobs.length > 0 ? (
		<List spacing={3} {...props}>
			{jobs.map((job) => (
				<JobPostListItem key={job.id} job={job} />
			))}
		</List>
	) : (
		<Text>No jobs found matching your filters.</Text>
	);
}
