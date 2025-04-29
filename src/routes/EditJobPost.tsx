import { Box, Divider, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Shell from '@layout/Shell';
import useJobPosts from '@queries/useJobPosts';
import EditJobForm from '@components/EditJobForm';
import { JobPostOutput } from '@lib/types';

export default function EditJobPost() {
	const { id: jobId } = useParams();
	const [jobPosts, { isLoading }] = useJobPosts(jobId ? [parseInt(jobId)] : []);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Shell title={jobId ? 'Edit Job Posting' : 'New Job Posting'}>
			<Text size='md'>
				{jobId
					? `You may edit your job posting while it is still pending publication.`
					: `Create a new job posting to be reviewed and published. You will be able to edit it later, until it is published.`}
			</Text>

			<Divider />

			<Box maxW='3xl' textAlign='left'>
				<EditJobForm initialData={jobPosts?.[0] as JobPostOutput} />
			</Box>
		</Shell>
	);
}
