import React from 'react';
import { Box } from '@chakra-ui/react';

import SearchFilter from '@/components/SearchFilter';

export default function Search() {
	return (
		<Box>
			<SearchFilter tempNumItems={5} heading="Filter 1" />
			<SearchFilter tempNumItems={12} heading="Filter 2" />
			<SearchFilter tempNumItems={21} heading="Filter 3" />
		</Box>
	);
}
