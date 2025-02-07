import JobsView from '@views/JobsView';
import useJobPosts from '@queries/useJobPosts';
import Shell from '@layout/Shell';

export default function Jobs() {
	const [jobs, { loading }] = useJobPosts();

	return (
		<Shell title='Jobs' loading={loading}>
			<JobsView jobs={jobs} />
		</Shell>
	);
}
