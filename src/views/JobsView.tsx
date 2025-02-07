import { JobPost } from '@lib/classes';
import JobsList from '@components/JobsList';
import { Box, Flex, Stack } from '@chakra-ui/react';

export default function JobsView({ jobs }: { jobs: JobPost[] }) {
	return (
		<Stack spacing={4} py={4}>
			<Flex
				w='full'
				border={'1px solid gray'}
				bg={'gray.500'}
				h='70px'
				textAlign='center'
				alignItems='center'
				justifyContent='center'
			>
				~~ Search/Filter ~~
			</Flex>
			<JobsList jobs={jobs} mt={2} />
		</Stack>
	);
}
