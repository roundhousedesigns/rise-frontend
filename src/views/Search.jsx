import React from 'react';

import SearchFilter from '@/components/common/SearchFilter';

// graphql

export default function Search() {
	return (
		<>
			<SearchFilter
				tempNumItems={12}
				heading="What department are you hiring for?"
			/>
			<SearchFilter
				tempNumItems={10}
				heading="What skills does the position require?"
			/>
			<SearchFilter tempNumItems={3} heading="Where are you looking to hire?" />
			<SearchFilter tempNumItems={3} heading="Anything else?" />
		</>
	);
}
