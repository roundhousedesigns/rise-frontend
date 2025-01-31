import { useParams } from 'react-router-dom';
import JobView from '@views/JobView';
import useJobPosts from '@queries/useJobPosts';
import Page from '@components/Page';

export default function Jobs() {
	const params = useParams();
	const id = params.id ? params.id : '';
	const [job, { loading }] = useJobPosts(parseInt(id));

	const title = !job.length ? '' : job[0].title;

	return (
		<Page title={title} loading={!!loading}>
			<JobView job={job[0]} />
		</Page>
	);
}
