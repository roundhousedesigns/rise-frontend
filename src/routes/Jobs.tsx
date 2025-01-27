import JobsView from '@views/JobsView';
import useJobs from '@queries/useJobs';
import Page from '@components/Page';

export default function Jobs() {
	const [jobs, { loading }] = useJobs();

	return (
		<Page title='Jobs' loading={loading}>
			<JobsView jobs={jobs} />
		</Page>
	);
}
