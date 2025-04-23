import { useState } from 'react';
import { Checkbox, Flex, Text } from '@chakra-ui/react';

interface JobsFiltersProps {
	onFilterChange: (filters: {
		internships: boolean;
		union: boolean;
		paid: boolean;
	}) => void;
}

export default function JobsFilters({ onFilterChange }: JobsFiltersProps) {
	const [filters, setFilters] = useState({
		internships: false,
		union: false,
		paid: false,
	});

	const handleFilterChange = (filter: keyof typeof filters) => {
		const newFilters = {
			...filters,
			[filter]: !filters[filter]
		};
		setFilters(newFilters);
		onFilterChange(newFilters);
	};

	return (
		<Flex gap={4} alignItems="center">
			<Text fontWeight="bold">Filters:</Text>
			<Flex gap={6}>
				<Checkbox
					isChecked={filters.internships}
					onChange={() => handleFilterChange('internships')}
				>
					Internships
				</Checkbox>
				<Checkbox
					isChecked={filters.union}
					onChange={() => handleFilterChange('union')}
				>
					Union Jobs
				</Checkbox>
				<Checkbox
					isChecked={filters.paid}
					onChange={() => handleFilterChange('paid')}
				>
					Paid Positions
				</Checkbox>
			</Flex>
		</Flex>
	);
}
