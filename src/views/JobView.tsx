import { Box, Heading, Link, Tag, Text, Wrap } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import parse from 'html-react-parser';
import { JobPost } from '@lib/classes';
interface Props {
	job: JobPost;
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
		contactPhone,
		companyAddress,
		compensation,
		instructions,
		startDate,
		endDate,
		isInternship,
		isUnion,
		description,
		applicationUrl,
		applicationPhone,
		applicationEmail,
	} = job || {};

	const parsedCompanyAddress = companyAddress ? parse(companyAddress) : '';

	const parsedDescription = description ? parse(description) : '';

	const parsedCompensation = compensation ? parse(compensation) : '';

	const parsedInstructions = instructions ? parse(instructions) : '';

	return (
		<Box>
			<Heading as='h2' fontSize='xl'>
				{companyName}
			</Heading>

			{parsedCompanyAddress ? <Text whiteSpace={'pre-wrap'}>{parsedCompanyAddress}</Text> : null}

			<Text>
				<strong>{contactName}</strong>:{' '}
				<Link as={RouterLink} to={`mailto:${contactEmail}`}>
					{contactEmail}
				</Link>{' '}
				{contactPhone ? (
					<>
						{' | '}
						<Link as={RouterLink} to={`tel:${contactPhone}`}>
							{contactPhone}
						</Link>
					</>
				) : (
					''
				)}
			</Text>

			{parsedCompensation ? (
				<Text whiteSpace={'pre-wrap'}>
					<strong>Compensation</strong>:{parsedCompensation}
				</Text>
			) : null}

			<Box>
				<strong>How to apply:</strong> {parsedInstructions}
			</Box>

			<Text>
				<strong>Start:</strong> {startDate}
			</Text>

			<Text>
				<strong>End:</strong> {endDate}
			</Text>

			<Wrap>
				{isInternship && (
					<Tag colorScheme='yellow' size={'sm'}>
						Internship
					</Tag>
				)}
				{isUnion && (
					<Tag colorScheme='red' size={'sm'}>
						Union
					</Tag>
				)}
			</Wrap>

			<Box>
				<strong>Description</strong>
				<br />
				{parsedDescription}
			</Box>

			{applicationUrl ? (
				<Text>
					<strong>Application URL</strong>: {applicationUrl}
				</Text>
			) : null}

			{applicationPhone ? (
				<Text>
					<strong>Application Phone</strong>: {applicationPhone}
				</Text>
			) : null}

			{applicationEmail ? (
				<Text>
					<strong>Application Email</strong>: {applicationEmail}
				</Text>
			) : null}
		</Box>
	);
}
