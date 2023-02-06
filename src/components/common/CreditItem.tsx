import { Credit } from '../../lib/classes';
import { Box, Text } from '@chakra-ui/react';

import { PositionData } from '../../lib/types';

interface Props {
	credit: Credit;
}

export default function CreditItem({ credit }: Props) {
	const { title, positions, venue, year } = credit;

	const positionsString = () =>
		positions.nodes.map((position: PositionData) => position.name).join(', ');

	const Separator = () => (
		<Text as='span' px={2}>
			{' '}
			&bull;
		</Text>
	);

	// TODO Accordion the first line, pull down to expose skills

	return (
		<Box>
			<Text fontSize='lg'>
				<Text as='span' fontWeight='bold'>
					{title}
				</Text>{' '}
				<Text as='span' color='gray.700' fontStyle='italic' pl={{ base: 0, md: 2 }}>
					{venue}
				</Text>
				{positions.nodes && positions.nodes.length > 0 && (
					<Text as='span'>
						{' '}
						<Separator />
						<Text as='span'>{positionsString()}</Text>
					</Text>
				)}
				{year && (
					<Text as='span'>
						{' '}
						<Separator /> {year}
					</Text>
				)}
			</Text>
		</Box>
	);
}
