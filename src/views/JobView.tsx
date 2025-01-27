import { Box, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import parse from 'html-react-parser';
import { Job } from '@lib/classes';
interface Props {
	job: Job;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function JobView({ job }: Props): JSX.Element | null {
	const {
		companyName,
		contactEmail,
		contactName,
		address,
		instructions,
		startDate,
		endDate,
		isInternship,
		isUnionJob,
		description,
		applicationUrl,
		applicationPhone,
		applicationEmail,
	} = job || {};

	const parsedDescription = description ? parse(description) : '';
	const parsedInstructions = instructions ? parse(instructions) : '';

	return (
		<Box>
			<Text>{companyName}</Text>
			<Text>
				<Link as={RouterLink} to={`mailto:${contactEmail}`}>
					{contactEmail}
				</Link>
			</Text>
			<Text>{contactName}</Text>
			<Text>{address}</Text>
			<Box>{parsedInstructions}</Box>
			<Text>{startDate}</Text>
			<Text>{endDate}</Text>
			<Text>{isInternship}</Text>
			<Text>{isUnionJob}</Text>
			<Box>{parsedDescription}</Box>
			<Text>{applicationUrl}</Text>
			<Text>{applicationPhone}</Text>
			<Text>{applicationEmail}</Text>
		</Box>
	);
}
