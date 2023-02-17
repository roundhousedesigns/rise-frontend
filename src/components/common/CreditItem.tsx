import { Credit } from '../../lib/classes';
import { Card, Heading, Text, Flex, useMediaQuery, Tag } from '@chakra-ui/react';

import { PositionTerm } from '../../lib/types';

interface Props {
	credit: Credit;
}

export default function CreditItem({ credit }: Props) {
	const { title, positions, venue, year, skills } = credit;
	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const positionsString = () => positions.map((position: PositionTerm) => position.name).join(', ');

	// TODO Accordion the first line, pull down to expose skills

	return (
		<Card my={3}>
			<Flex alignItems='center'>
				<Heading fontWeight='bold' fontSize='lg'>
					{title}
					{year ? ` (${year})` : ''}
				</Heading>
				<Text color='gray.700' fontStyle='italic' pl={{ base: 0, md: 2 }} fontSize='md'>
					{venue}
				</Text>
			</Flex>
			<Flex alignItems='center'>
				{positions && positions.length > 0 ? (
					// TODO If jobs selected, show those. If not, just show departments.
					<Text fontSize='md'>{positionsString()}</Text>
				) : null}
				{skills && skills.length > 0
					? skills.map((skill) => <Tag key={skill.slug}>{skill.name}</Tag>)
					: null}
			</Flex>
		</Card>
	);
}
