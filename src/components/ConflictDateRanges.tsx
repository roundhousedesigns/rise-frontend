import { useContext, useMemo } from 'react';
import { List, ListItem, Flex, Divider, ListProps, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { FiAlertCircle, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { DateRange } from '@lib/classes';
import { dateRangesOverlap } from '@lib/utils';
import { SearchContext } from '@context/SearchContext';
import WrapWithIcon from '@common/WrapWithIcon';

interface Props {
	conflictRanges: DateRange[];
}

export default function ConflictDateRanges({
	conflictRanges,
	...props
}: Props & ListProps): JSX.Element {
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
		<Flex fontSize='sm' flexWrap='wrap' gap={1}>
			<WrapWithIcon icon={FiCheckCircle} iconProps={{ color: 'brand.blue' }} my={0} mr={1}>
				Available
			</WrapWithIcon>
			<WrapWithIcon icon={FiAlertCircle} iconProps={{ color: 'red.300' }} my={0}>
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
					let icon, color, title;

					const _jobDates = jobDates ? jobDates : new DateRange();

					switch (true) {
						case !_jobDates.startDate:
							icon = FiCalendar;
							color = '';
							title = '';
							break;
						case dateRangesOverlap(_jobDates, conflictRange):
							icon = FiAlertCircle;
							color = 'red.300';
							title = 'Possible scheduling conflict';
							break;
						default:
							icon = FiCheckCircle;
							color = 'brand.blue';
							title = 'Available';
					}

					return (
						<ListItem key={index}>
							<WrapWithIcon
								icon={icon}
								iconProps={{
									color: color,
									title: title,
									my: 1,
								}}
								alignItems='flex-start'
							>
								<Text m={0}>{conflictRange.toString('long')}</Text>
							</WrapWithIcon>
						</ListItem>
					);
				})}
			</List>
		</>
	);
}
