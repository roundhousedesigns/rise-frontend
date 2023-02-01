import React from 'react';
import { Avatar, Text, Stack } from '@chakra-ui/react';
import { Candidate } from '../../lib/classes';

interface Props {
	candidate: Candidate;
}

export default function CandidateItem({ candidate }: Props) {
	const { name, selfTitle } = candidate;

	return (
		<Stack
			direction='row'
			justifyContent='flex-start'
			alignItems='baseline'
			flexWrap={{ base: 'wrap', md: 'nowrap' }}
			gap={{ base: 'initial', md: 0 }}
		>
			<Avatar size='sm' name={name} flex='0 0 auto' mr={2} />
			<Text fontSize='md' fontWeight='normal' textAlign='left' flex='1' mb={{ base: 1, lg: 0 }}>
				{name}
			</Text>
			<Text
				fontSize='sm'
				textAlign='right'
				ml={{ base: '0 !important', lg: 'initial' }}
				flex='1'
				noOfLines={1}
			>
				{selfTitle}
			</Text>
		</Stack>
	);
}
