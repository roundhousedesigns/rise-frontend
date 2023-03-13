import { Tag, Text, Wrap } from '@chakra-ui/react';
import { Credit } from '../../lib/classes';

import { WPItem } from '../../lib/classes';
import useTaxonomyTerm from '../../hooks/queries/useTaxonomyTerm';

interface Props {
	credit: Credit;
}

export default function CreditPositions({ credit }: Props): JSX.Element | null {
	const { skills, positions } = credit;
	const [department] = useTaxonomyTerm(positions[0]?.id);

	return (
		department && (
			<Tag fontWeight='medium' colorScheme='orange' size='lg'>
				{department?.name}
			</Tag>
		)
	);
}
