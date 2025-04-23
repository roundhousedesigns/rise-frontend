import { List, ListItem, ListProps, Text } from '@chakra-ui/react';
import { JobPost } from '@lib/classes';
import JobListItem from '@common/JobListItem';

interface Props {
	jobs: JobPost[];
}

export default function JobsList({ jobs, ...props }: Props & ListProps) {
	return jobs.length > 0 ? (
		<List {...props}>
			{jobs.map((job) => (
				<ListItem key={job.id}>
					<JobListItem job={job} />
				</ListItem>
			))}
		</List>
	) : (
		<Text>No jobs found matching your filters.</Text>
	);
}
