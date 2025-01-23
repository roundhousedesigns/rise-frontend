import { useParams } from 'react-router-dom';
import useJobs from '@queries/useJobs';
import JobView from '@views/JobView';
import Page from '@components/Page';

export default function Jobs() {
	const params = useParams();
	const id = params.id ? params.id : '';
	const [job, { loading }] = useJobs(parseInt(id));

	const title = !job.length ? '' : job[0].companyName;

	return (
		<Page title={title} loading={!!loading}>
			<JobView job={job[0]} />
		</Page>
	);
}
