import Shell from '@layout/Shell';
import useJobPosts from '@queries/useJobPosts';
import { Spinner } from '@chakra-ui/react';
import EditJobForm from '@components/EditJobForm';
import { useParams } from 'react-router-dom';
import { JobPostOutput } from '@lib/types';

export default function EditJobPost() {
	const { id: jobId } = useParams();
	const [jobPosts, { isLoading }] = useJobPosts(jobId ? [parseInt(jobId)] : []);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Shell title={jobId ? 'Edit Job' : 'Create Job'}>
			<EditJobForm initialData={jobPosts?.[0] as JobPostOutput} />
		</Shell>
	);
}
