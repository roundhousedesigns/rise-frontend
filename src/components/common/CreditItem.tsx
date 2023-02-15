import { Credit } from '../../lib/classes';
import { Card, Text, useMediaQuery } from '@chakra-ui/react';

import { PositionTerm } from '../../lib/types';

interface Props {
	credit: Credit;
}

export default function CreditItem({ credit }: Props) {
	const { title, positions, venue, year } = credit;
	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const positionsString = () =>
		positions.nodes.map((position: PositionTerm) => position.name).join(', ');

	const Separator = () =>
		isLargerThanMd ? (
			<Text as='span' px={1}>
				&bull;
			</Text>
		) : (
			<br />
		);

	// TODO Accordion the first line, pull down to expose skills

	return (
		<Card my={2}>
			<Text fontSize='lg'>
				<Text as='span' fontWeight='bold'>
					{title}
					{year ? ` (${year})` : ''}
				</Text>
				<Separator />
				<Text as='span' color='gray.700' fontStyle='italic' pl={{ base: 0, md: 2 }} fontSize='md'>
					{venue}
				</Text>
				{positions.nodes && positions.nodes.length > 0 ? (
					<Text as='span' fontSize='md'>
						{' '}
						<Separator />
						<Text as='span'>{positionsString()}</Text>
					</Text>
				) : null}
			</Text>
		</Card>
	);
}
