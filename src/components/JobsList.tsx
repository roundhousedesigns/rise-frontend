import { List, ListItem, ListProps, Tag } from '@chakra-ui/react';
import { JobPost } from '@lib/classes';
import JobListItem from '@common/JobListItem';

interface Props {
	jobs: JobPost[];
}

export default function JobsList({ jobs, ...props }: Props & ListProps) {
	return (
		<List {...props}>
			{jobs.map((job) => (
				<ListItem key={job.id}>
					<JobListItem job={job} />
				</ListItem>
			))}
		</List>
	);
}
