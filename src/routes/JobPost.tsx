import { useParams } from 'react-router-dom';
import Shell from '@layout/Shell';
import JobPostView from '@views/JobPostView';
import useJobPosts from '@queries/useJobPosts';

export default function JobPost() {
	const params = useParams();
	const id = params.id ? params.id : '';
	const [job, { loading }] = useJobPosts([parseInt(id)]);

	return (
		<Shell loading={!!loading}>
			<JobPostView job={job[0]} />
		</Shell>
	);
}
