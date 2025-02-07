import { useParams } from 'react-router-dom';
import JobView from '@views/JobView';
import useJobPosts from '@queries/useJobPosts';
import Shell from '@layout/Shell';

export default function Jobs() {
	const params = useParams();
	const id = params.id ? params.id : '';
	const [job, { loading }] = useJobPosts(parseInt(id));

	const title = !job.length ? '' : job[0].title;

	return (
		<Shell title={title} loading={!!loading}>
			<JobView job={job[0]} />
		</Shell>
	);
}
