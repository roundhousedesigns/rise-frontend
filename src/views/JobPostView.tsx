import {
	Box,
	Card,
	Flex,
	Heading,
	Link,
	Stack,
	Tag,
	Text,
	Wrap,
	Button,
	ButtonGroup,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import parse from 'html-react-parser';
import { JobPost } from '@lib/classes';
import HeadingCenterline from '@common/HeadingCenterline';
import WrapWithIcon from '@common/WrapWithIcon';
import {
	FiCalendar,
	FiDollarSign,
	FiMail,
	FiMap,
	FiPhone,
	FiUser,
	FiExternalLink,
} from 'react-icons/fi';
interface Props {
	job: JobPost;
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function JobPostView({ job }: Props): JSX.Element | null {
	const {
		title,
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
		<>
			<HeadingCenterline lineColor='brand.blue' mt={2}>
				{title}
			</HeadingCenterline>
			<Wrap>
				<Heading as='h2' fontSize='xl' my={0}>
					{companyName}
				</Heading>
				<Flex alignItems='flex-end' gap={2}>
					{isUnion && (
						<Tag colorScheme='orange' size='sm'>
							Union
						</Tag>
					)}
					{isInternship && (
						<Tag colorScheme='yellow' size='sm'>
							Internship
						</Tag>
					)}
				</Flex>
			</Wrap>

			<Box w='full'>
				<Flex gap={4} flexWrap='wrap' w='100%'>
					<Card gap={0} flex='0 0 250px'>
						{parsedCompanyAddress ? (
							<Stack gap={2}>
								<WrapWithIcon icon={FiMap} my={0}>
									<Text whiteSpace={'pre-wrap'} my={0} lineHeight='short'>
										{parsedCompanyAddress}
									</Text>
								</WrapWithIcon>
								<WrapWithIcon icon={FiCalendar}>
									<Wrap>
										<Text as='span' m={0}>
											{`Starts on ${startDate}${endDate ? ` - ${endDate}` : ''}`}
										</Text>
									</Wrap>
								</WrapWithIcon>
							</Stack>
						) : null}
					</Card>
					<Card flex='1'>
						<Stack gap={2}>
							<WrapWithIcon icon={FiUser} my={0}>
								{contactName}
							</WrapWithIcon>

							<WrapWithIcon icon={FiMail} my={0}>
								<Link as={RouterLink} to={`mailto:${contactEmail}`} my={0}>
									{contactEmail}
								</Link>
							</WrapWithIcon>

							{contactPhone && (
								<WrapWithIcon icon={FiPhone} my={0}>
									<Link as={RouterLink} to={`tel:${contactPhone}`} my={0}>
										{contactPhone}
									</Link>
								</WrapWithIcon>
							)}

							{parsedCompensation && (
								<WrapWithIcon icon={FiDollarSign} my={0}>
									<Text whiteSpace={'pre-wrap'} my={0}>
										{parsedCompensation}
									</Text>
								</WrapWithIcon>
							)}
						</Stack>
					</Card>
				</Flex>

				<Box>
					<HeadingCenterline lineColor='brand.orange'>Job Description</HeadingCenterline>
					<Box className='wp-post-content'>{parsedDescription}</Box>
				</Box>

				<Box>
					<HeadingCenterline lineColor='brand.blue'>How to apply</HeadingCenterline>

					{parsedInstructions ? <Text>{parsedInstructions}</Text> : null}

					<ButtonGroup colorScheme='blue'>
						{applicationUrl ? (
							<Button
								as='a'
								href={applicationUrl}
								leftIcon={<FiExternalLink />}
								size='md'
								target='_blank'
								rel='noopener noreferrer'
							>
								Apply Online
							</Button>
						) : null}

						{applicationPhone ? (
							<Button as='a' href={`tel:${applicationPhone}`} leftIcon={<FiPhone />} size='md'>
								Call to Apply: {applicationPhone}
							</Button>
						) : null}

						{applicationEmail ? (
							<Button as='a' href={`mailto:${applicationEmail}`} leftIcon={<FiMail />} size='md'>
								Email to Apply: {applicationEmail}
							</Button>
						) : null}
					</ButtonGroup>
				</Box>
			</Box>
		</>
	);
}
