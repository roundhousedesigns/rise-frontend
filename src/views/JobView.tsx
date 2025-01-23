import { Box, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Job } from '@lib/classes';

interface Props {
	job: Job;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function JobView({ job }: Props): JSX.Element | null {
	const { companyName, contactEmail, contactName } = job || {};

	return (
		<Box>
			<Text>{companyName}</Text>
			<Text>
				<Link as={RouterLink} to={`mailto:${contactEmail}`}>
					{contactEmail}
				</Link>
			</Text>
			<Text>{contactName}</Text>
		</Box>
	);
}
