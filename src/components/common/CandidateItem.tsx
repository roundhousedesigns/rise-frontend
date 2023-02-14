import { Link as RouterLink } from 'react-router-dom';
import { Card, Avatar, Text, Flex, Link } from '@chakra-ui/react';
import { fullName } from '../../lib/utils';

import { Candidate } from '../../lib/classes';

interface Props {
	candidate: Candidate;
}

export default function CandidateItem({ candidate }: Props) {
	const name = fullName(candidate.firstName, candidate.lastName);

	return (
		<Card py={2}>
			<Flex
				direction='row'
				justifyContent='flex-start'
				alignItems='center'
				flexWrap={{ base: 'wrap', md: 'nowrap' }}
				gap={{ base: 'initial', md: 0 }}
			>
				<Avatar size='sm' name={name} flex='0 0 auto' mr={2} src={candidate.image} />
				<Text
					fontSize='md'
					fontWeight='normal'
					textAlign='left'
					flex='1'
					mt={0}
					mb={{ base: 1, lg: 0 }}
				>
					<Link as={RouterLink} to={`/profile/${candidate.id}`}>
						{name}
					</Link>
				</Text>
				<Text
					fontSize='sm'
					textAlign='right'
					ml={{ base: '0 !important', lg: 'initial' }}
					flex='1'
					noOfLines={1}
				>
					{candidate.selfTitle}
				</Text>
			</Flex>
		</Card>
	);
}
