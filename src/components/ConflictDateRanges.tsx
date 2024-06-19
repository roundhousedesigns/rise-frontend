import { useContext, useMemo } from 'react';
import { List, ListItem } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { FiCalendar } from 'react-icons/fi';
import { DateRange } from '@lib/classes';
import { dateRangesOverlap } from '@lib/utils';
import { SearchContext } from '@context/SearchContext';
import WrapWithIcon from '@common/WrapWithIcon';

interface Props {
	conflictRanges: DateRange[];
	[prop: string]: any;
}

export default function ConflictDateRanges({ conflictRanges, ...props }: Props): JSX.Element {
	if (isEmpty(conflictRanges)) {
		return <></>;
	}

	const {
		search: {
			filters: {
				filterSet: { jobDates },
			},
		},
	} = useContext(SearchContext);

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
					<WrapWithIcon
						icon={FiCalendar}
						color={jobDates && dateRangesOverlap(jobDates, conflictRange) ? 'brand.yellow' : ''}
					>
						{conflictRange.toString('long')}
					</WrapWithIcon>
				</ListItem>
			))}
		</List>
	);
}
