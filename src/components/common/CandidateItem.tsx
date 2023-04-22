import { Link as RouterLink } from 'react-router-dom';
import { Card, Avatar, Text, Flex, Link } from '@chakra-ui/react';

import { Candidate } from '../../lib/classes';

interface Props {
	candidate: Candidate;
	[prop: string]: any;
}

export default function CandidateItem({ candidate, ...props }: Props) {
	return (
		<Card py={2} my={0} {...props}>
			<Flex
				direction='row'
				justifyContent='flex-start'
				alignItems='center'
				flexWrap={{ base: 'wrap', md: 'nowrap' }}
				gap={{ base: 'initial', md: 0 }}
			>
				<Avatar
					size='sm'
					name={candidate.fullName()}
					flex='0 0 auto'
					mr={2}
					src={candidate.image}
				/>
				<Text
					fontSize='md'
					fontWeight='normal'
					textAlign='left'
					flex='1'
					mt={0}
					mb={{ base: 1, lg: 0 }}
				>
					<Link as={RouterLink} to={`/profile/${candidate.id}`}>
						{candidate.fullName()}
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
