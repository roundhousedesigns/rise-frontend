import { useContext, useMemo } from 'react';
import { List, ListItem, Flex, Divider } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { FiAlertCircle, FiCalendar, FiCheckCircle } from 'react-icons/fi';
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

	const sortedDateRanges: DateRange[] = useMemo(() => {
		return conflictRanges
			.slice()
			.sort((a, b) =>
				a.startDate && b.startDate ? a.startDate.getTime() - b.startDate.getTime() : 0
			);
	}, [conflictRanges]);

	const Legend = () => (
		<Flex fontSize='sm' flexWrap='wrap' gap={4}>
			<WrapWithIcon icon={FiCheckCircle} iconProps={{ color: 'brand.blue' }} my={0}>
				Available
			</WrapWithIcon>
			<WrapWithIcon icon={FiAlertCircle} iconProps={{ color: 'brand.yellow' }} my={0}>
				Possible conflict
			</WrapWithIcon>
		</Flex>
	);

	return (
		<>
			{jobDates && jobDates.startDate ? (
				<>
					<Legend />
					<Divider />
				</>
			) : (
				false
			)}

			<List spacing={2} {...props}>
				{sortedDateRanges.map((conflictRange: DateRange, index: number) => {
					const icon =
						!jobDates || !jobDates.startDate
							? FiCalendar
							: dateRangesOverlap(jobDates, conflictRange)
							? FiAlertCircle
							: FiCheckCircle;
					const color =
						!jobDates || !jobDates.startDate
							? ''
							: dateRangesOverlap(jobDates, conflictRange)
							? 'brand.yellow'
							: 'brand.blue';
					const title =
						!jobDates || !jobDates.startDate
							? ''
							: dateRangesOverlap(jobDates, conflictRange)
							? 'Possible scheduling conflict'
							: 'Available';

					return (
						<ListItem key={index}>
							<WrapWithIcon
								icon={icon}
								iconProps={{
									color: color,
									title: title,
								}}
							>
								{conflictRange.toString('long')}
							</WrapWithIcon>
						</ListItem>
					);
				})}
			</List>
		</>
	);
}
