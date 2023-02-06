import { Credit } from '../../lib/classes';
import { Box, Text } from '@chakra-ui/react';
import { Key } from 'react';

interface Props {
	credit: Credit;
}

export default function CreditItem({ credit }: Props) {
	return (
		<Box>
			<Text>
				{credit.title} &mdash; {credit.jobTitle} ({credit.year})
			</Text>
		</Box>
	);
}
