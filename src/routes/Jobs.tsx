import JobsView from '@views/JobsView';
import useJobPosts from '@queries/useJobPosts';
import Page from '@components/Page';

export default function Jobs() {
	const [jobs, { loading }] = useJobPosts();

	return (
		<Page title='Jobs' loading={loading}>
			<JobsView jobs={jobs} />
		</Page>
	);
}
