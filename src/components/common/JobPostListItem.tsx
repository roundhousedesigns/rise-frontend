import {
	Box,
	Card,
	Flex,
	Heading,
	LinkBox,
	LinkOverlay,
	ListItem,
	Spacer,
	Stack,
	StackItem,
	Tag,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { JobPost } from '@lib/classes';

interface JobPostListItemProps {
	job: JobPost;
	[prop: string]: any;
}

export default function JobPostListItem({ job, ...props }: JobPostListItemProps): JSX.Element {
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
		<ListItem {...props}>
			<LinkBox>
				<Card variant='listItem' textDecoration='none' mx={0} px={4} py={2}>
					<Flex gap={2} alignItems='center'>
						<Box flex='0 0 33%'>
							<Heading as='h3' fontSize='lg' my={0} mb={0}>
								<LinkOverlay as={RouterLink} to={`/job/${id}`} textDecoration='none'>
									{title}
								</LinkOverlay>
							</Heading>
							<Text fontSize='sm' color='gray.500' lineHeight='normal' my={0}>
								{companyName}
							</Text>
						</Box>
						<Box fontSize='sm'>
							{compensation ? (
								<Text my={0} lineHeight='short'>
									{compensation}
								</Text>
							) : null}
							<Text my={0} lineHeight='short'>
								{datesString}
							</Text>
						</Box>
						<Spacer />
						<Wrap>
							{isInternship && (
								<Tag colorScheme='yellow' size='xs'>
									Internship
								</Tag>
							)}
							{isPaid && (
								<Tag colorScheme='green' size='xs'>
									Paid
								</Tag>
							)}
							{isUnion && (
								<Tag colorScheme='red' size='xs'>
									Union
								</Tag>
							)}
						</Wrap>
					</Flex>
				</Card>
			</LinkBox>
		</ListItem>
	);
}
