import { Link as RouterLink } from 'react-router-dom';
import { Card, Avatar, Text, Flex, Heading } from '@chakra-ui/react';

import { Candidate } from '../../lib/classes';

interface Props {
	candidate: Candidate;
	[prop: string]: any;
}

export default function CandidateItem({ candidate, ...props }: Props) {
	const { image, slug, selfTitle } = candidate;

	return (
		<Card
			as={RouterLink}
			to={`/profile/${slug}`}
			py={2}
			my={0}
			_dark={{
				_hover: {
					bg: 'gray.700',
				},
			}}
			_light={{
				_hover: {
					bg: 'gray.50',
				},
			}}
			{...props}
		>
			<Flex
				direction='row'
				justifyContent='flex-start'
				alignItems='center'
				flexWrap={{ base: 'wrap', md: 'nowrap' }}
				gap={{ base: 'initial', md: 0 }}
			>
				<Avatar size='md' name={candidate.fullName()} flex='0 0 auto' mr={2} src={image} />
				<Heading
					as='h3'
					fontSize='lg'
					fontWeight='normal'
					textAlign='left'
					flex='1'
					mt={0}
					mb={{ base: 1, lg: 0 }}
				>
					{candidate.fullName() ? candidate.fullName() : 'No name'}
				</Heading>
				<Text textAlign='right' ml={{ base: '0 !important', lg: 'initial' }} flex='1' noOfLines={1}>
					{selfTitle}
				</Text>
			</Flex>
		</Card>
	);
}
