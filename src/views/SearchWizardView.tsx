import React from 'react';
import { FormControl, Button } from '@chakra-ui/react';

import SearchFilter from '../components/common/SearchFilter';

export default function SearchWizardView() {
	return (
		<FormControl textAlign="left">
			<SearchFilter
				_devNumItems={12}
				_devReturnElement="button"
				heading="What department are you hiring for?"
			/>
			<SearchFilter
				_devNumItems={10}
				_devReturnElement="button"
				heading="What skills does the position require?"
			/>
			<SearchFilter
				_devNumItems={3}
				_devReturnElement="select"
				heading="Where are you looking to hire?"
			/>
			<SearchFilter
				_devNumItems={3}
				_devReturnElement="select"
				heading="Anything else?"
			/>
			<Button type="submit" size="lg">
				Search
			</Button>
		</FormControl>
	);
}
