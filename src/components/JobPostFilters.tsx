import { useState } from 'react';
import { Box, BoxProps, Flex, Text, VisuallyHidden } from '@chakra-ui/react';
import CheckboxButton from '@common/inputs/CheckboxButton';

interface JobPostFiltersProps {
	onFilterChange: (filters: { internships: boolean; union: boolean; paid: boolean }) => void;
}

export default function JobPostFilters({
	onFilterChange,
	...props
}: JobPostFiltersProps & BoxProps) {
	const [filters, setFilters] = useState({
		internships: false,
		union: false,
		paid: false,
	});

	const handleFilterChange = (filter: keyof typeof filters) => {
		const newFilters = {
			...filters,
			[filter]: !filters[filter],
		};
		setFilters(newFilters);
		onFilterChange(newFilters);
	};

	return (
		<Box {...props}>
			<Text fontWeight='bold'>I'm looking for:</Text>
			<Flex gap={4}>
				<CheckboxButton
					isChecked={filters.internships}
					onChange={() => handleFilterChange('internships')}
					size='sm'
				>
					Internships
				</CheckboxButton>
				<CheckboxButton
					isChecked={filters.union}
					onChange={() => handleFilterChange('union')}
					size='sm'
				>
					Union Jobs
				</CheckboxButton>
				<CheckboxButton
					isChecked={filters.paid}
					onChange={() => handleFilterChange('paid')}
					size='sm'
				>
					Paid Positions
				</CheckboxButton>
			</Flex>
		</Box>
	);
}
