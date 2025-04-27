import { useEffect, useState } from 'react';
import { Card, Heading, Stack, Tag, Text, Wrap, IconButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { JobPost } from '@lib/classes';
import useViewer from '@queries/useViewer';
import { FiEdit2 } from 'react-icons/fi';

interface JobPostListItemProps {
	job: JobPost;
}

export default function JobPostListItem({ job }: JobPostListItemProps): JSX.Element {
	const [{ loggedInId }] = useViewer();

	const {
		id,
		author,
		title,
		companyName,
		isInternship,
		isPaid,
		isUnion,
		compensation,
		startDate,
		endDate,
	} = job;

	const [isAuthor, setIsAuthor] = useState(false);

	useEffect(() => {
		setIsAuthor(loggedInId === author);
	}, [loggedInId, author]);

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
				{isAuthor && (
					<IconButton
						as={RouterLink}
						to={`/jobs/edit/${id}`}
						aria-label={`Edit ${job.title}`}
						icon={<FiEdit2 />}
					/>
				)}
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
