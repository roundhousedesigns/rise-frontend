import { Link, List, ListItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useJobs from '@hooks/queries/useJobs';

export default function JobsView() {
	const [jobs, result] = useJobs();

	return (
		<List>
			{jobs.map((job) => (
				<ListItem key={job.id}>
					<Link as={RouterLink} to={`/job/${job.id}`}>
						{job.companyName}
					</Link>
				</ListItem>
			))}
		</List>
	);
}
