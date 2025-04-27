import { Link as RouterLink } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';
import useViewer from '@queries/useViewer';
import useJobPosts from '@queries/useJobPosts';
import useFilteredJobPostIds from '@queries/useFilteredJobPostIds';
import JobPostsView from '@views/JobPostsView';
import Shell from '@layout/Shell';

const JobPostButton = () => {
	const [{ loggedInId }] = useViewer();
	const [allJobPostIds] = useFilteredJobPostIds();
	const [jobs] = useJobPosts(allJobPostIds);

	const postedJobs = jobs.filter((job) => job.author === loggedInId);

	return (
		<ButtonGroup>
			<Button as={RouterLink} to='/jobs/new'>
				Post a Job
			</Button>
			{postedJobs.length > 0 && (
				<Button as={RouterLink} to='/jobs/manage'>
					Manage Posted Jobs
				</Button>
			)}
		</ButtonGroup>
	);
};

export default function JobPosts() {
	return (
		<Shell title='Jobs Board' actions={<JobPostButton />}>
			<JobPostsView />
		</Shell>
	);
}
