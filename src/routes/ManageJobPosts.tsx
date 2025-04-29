import Shell from '@layout/Shell';
import ManageJobPostsView from '@views/ManageJobPostsView';
import useFilteredJobPostIds from '@queries/useFilteredJobPostIds';
import useJobPosts from '@queries/useJobPosts';
import useViewer from '@queries/useViewer';

export default function ManageJobPosts() {
	const [{ loggedInId }] = useViewer();
	const [allJobPostIds] = useFilteredJobPostIds({ status: ['publish', 'pending'] });
	const [jobs, { loading }] = useJobPosts(allJobPostIds);

	const postedJobs = jobs.filter((job) => job.author === loggedInId);

	return (
		<Shell title='Manage Job Posts' loading={loading}>
			<ManageJobPostsView jobs={postedJobs} />
		</Shell>
	);
}
