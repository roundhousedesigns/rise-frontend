import {
	Card,
	Heading,
	List,
	ListItem,
	ListProps,
	Spacer,
	Stack,
	Tag,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { JobPost } from '@lib/classes';

interface Props {
	jobs: JobPost[];
}

export default function JobsList({ jobs, ...props }: Props & ListProps) {
	return (
		<List {...props}>
			{jobs.map((job) => {
				// TODO Move this to a new JobsListItem component.
				const { id, title, companyName, isInternship, isPaid, isUnion, compensation } = job;

				const datesString = job.endDate
					? `${job.startDate} - ${job.endDate}`
					: `Starts ${job.startDate}`;

				return (
					<ListItem key={id}>
						<Card variant='listItem' as={RouterLink} to={`/job/${job.id}`}>
							<Stack gap={2}>
								<Heading as='h3' fontSize='3xl' my={0}>
									<Text as='span' mr={4}>
										{title}
									</Text>
									<Text as='span' fontSize='xl'>
										{companyName}
									</Text>
								</Heading>
								<Wrap>
									{isInternship && (
										<Tag colorScheme='yellow' size='sm'>
											Internship
										</Tag>
									)}
									{isPaid && (
										<Tag colorScheme='green' size='sm'>
											Paid
										</Tag>
									)}
									{isUnion && (
										<Tag colorScheme='red' size='sm'>
											Union
										</Tag>
									)}
								</Wrap>

								{compensation ? <Text>{compensation}</Text> : ''}

								<Text my={0}>{datesString}</Text>
							</Stack>
						</Card>
					</ListItem>
				);
			})}
		</List>
	);
}
