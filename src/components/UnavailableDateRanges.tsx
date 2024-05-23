import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { UnavailRange } from '@lib/classes';

interface Props {
	unavailRanges: UnavailRange[];
	[prop: string]: any;
}

export default function UnavailableDateRanges({ unavailRanges, ...props }: Props): JSX.Element {
	if (isEmpty(unavailRanges)) {
		return <></>;
	}

	return (
		<Box {...props}>
			<Heading variant='contentTitle'>Unavailable on</Heading>
			<List
				spacing={2}
				lineHeight='taller'
				pl={2}
				mt={3}
				ml={2}
				borderLeftStyle='solid'
				borderLeftWidth={4}
				borderLeftColor='red.300'
			>
				{unavailRanges.map((unavailRange: UnavailRange, index: number) => (
					<ListItem key={index}>{unavailRange.toString()}</ListItem>
				))}
			</List>
		</Box>
	);
}
