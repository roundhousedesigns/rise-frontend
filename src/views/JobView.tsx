import { Box, Text } from '@chakra-ui/react';
import { Job } from '@lib/types';

interface Props {
	job: Job;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function JobView({ job }: Props): JSX.Element | null {
	const { contactEmail, contactName } = job || {};

	return (
		<Box>
			<Text>{contactEmail}</Text>
			<Text>{contactName}</Text>
		</Box>
	);
}
