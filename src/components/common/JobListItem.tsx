import { ReactNode } from 'react';
import { Card, Heading, Stack, Tag, Text, Wrap } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { JobPost } from '@lib/classes';

interface JobListItemProps {
	job: JobPost;
}

export default function JobListItem({ job }: JobListItemProps): JSX.Element {
	const {
		id,
		title,
		companyName,
		isInternship,
		isPaid,
		isUnion,
		compensation,
		startDate,
		endDate,
	} = job;

	const datesString = endDate ? `${startDate} - ${endDate}` : `Starts ${startDate}`;

	return (
		<Card
			variant='listItem'
			as={RouterLink}
			to={`/job/${id}`}
			textDecoration='none'
			mx={0}
			px={4}
			pt={0}
			pb={2}
		>
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

				{compensation ? <Text>{compensation}</Text> : null}

				<Text my={0}>{datesString}</Text>
			</Stack>
		</Card>
	);
}
