import { List, ListItem } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { DateRange } from '@lib/classes';
import WrapWithIcon from './common/WrapWithIcon';
import { FiSlash } from 'react-icons/fi';
import { useMemo } from 'react';

interface Props {
	conflictRanges: DateRange[];
	[prop: string]: any;
}

export default function ConflictDateRanges({ conflictRanges, ...props }: Props): JSX.Element {
	if (isEmpty(conflictRanges)) {
		return <></>;
	}

	// TODO If a search is active, and we're not on the logged in user's profile, highlight conflict ranges which overlap with the search results.

	const sortedDateRanges: DateRange[] = useMemo(() => {
		return conflictRanges
			.slice()
			.sort((a, b) =>
				a.startDate && b.startDate ? a.startDate.getTime() - b.startDate.getTime() : 0
			);
	}, [conflictRanges]);

	return (
		<List spacing={2} {...props}>
			{sortedDateRanges.map((conflictRange: DateRange, index: number) => (
				<ListItem key={index}>
					<WrapWithIcon icon={FiSlash}>{conflictRange.toString('long')}</WrapWithIcon>
				</ListItem>
			))}
		</List>
	);
}
