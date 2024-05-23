import { List, ListItem } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { UnavailRange } from '@lib/classes';
import WrapWithIcon from './common/WrapWithIcon';
import { FiSlash } from 'react-icons/fi';

interface Props {
	unavailRanges: UnavailRange[];
	[prop: string]: any;
}

export default function UnavailableDateRanges({ unavailRanges, ...props }: Props): JSX.Element {
	if (isEmpty(unavailRanges)) {
		return <></>;
	}

	return (
		<List spacing={2} {...props}>
			{unavailRanges.map((unavailRange: UnavailRange, index: number) => (
				<ListItem key={index}>
					<WrapWithIcon icon={FiSlash}>{unavailRange.toString('long')}</WrapWithIcon>
				</ListItem>
			))}
		</List>
	);
}
