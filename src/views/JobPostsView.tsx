import { useState } from 'react';
import {
	Flex,
	Stack,
	Spinner,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Divider,
} from '@chakra-ui/react';
import useFilteredJobPostIds from '@queries/useFilteredJobPostIds';
import useJobPosts from '@queries/useJobPosts';
import JobPostFilters from '@components/JobPostFilters';
import JobPostsList from '@components/JobPostsList';

export default function JobPostsView() {
	const [filters, setFilters] = useState({
		internships: false,
		union: false,
		paid: false,
	});

	const [jobPostIds] = useFilteredJobPostIds(filters);
	const [jobs, { loading, error }] = useJobPosts(jobPostIds);

	return (
		<Stack spacing={4}>
			<JobPostFilters onFilterChange={setFilters} mt={4} />

			<Divider my={1} />

			{loading && (
				<Flex justify='center' align='center' py={8}>
					<Spinner size='xl' />
				</Flex>
			)}

			{error && (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>Error loading jobs</AlertTitle>
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			)}
			{!loading && !error && <JobPostsList jobs={jobs} mt={2} />}
		</Stack>
	);
}
