import React from 'react';

import SearchFilter from '@/components/common/SearchFilter';

export default function Search() {
	return (
		<>
			<SearchFilter tempNumItems={5} heading="Filter 1" />
			<SearchFilter tempNumItems={12} heading="Filter 2" />
			<SearchFilter tempNumItems={21} heading="Filter 3" />
		</>
	);
}
