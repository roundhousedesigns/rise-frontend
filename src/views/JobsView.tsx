import JobsList from '@components/JobsList';
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
import JobsFilters from '@components/JobsFilters';
import { useState } from 'react';
import useFilteredJobPostIds from '@queries/useFilteredJobPostIds';
import useJobPosts from '@queries/useJobPosts';

export default function JobsView() {
	const [filters, setFilters] = useState({
		internships: false,
		union: false,
		paid: false,
	});

	const [jobPostIds] = useFilteredJobPostIds(filters);
	const [jobs, { loading, error }] = useJobPosts(jobPostIds);

	return (
		<Stack spacing={4}>
			<JobsFilters onFilterChange={setFilters} mt={4} />

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
			{!loading && !error && <JobsList jobs={jobs} mt={2} />}
		</Stack>
	);
}
