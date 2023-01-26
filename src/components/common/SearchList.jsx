import React from 'react';
import { List, ListItem, Text } from '@chakra-ui/react';

export default function SearchList({ items }) {
	return (
		<List>
			{items.map((i, index) => (
				<ListItem key={index} pl={4} mb={4}>
					<Text>{i}</Text>
				</ListItem>
			))}
		</List>
	);
}
