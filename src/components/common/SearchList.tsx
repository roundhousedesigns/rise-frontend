import { List, ListItem, Text } from '@chakra-ui/react';

interface Props {
	items: string[];
}

export default function SearchList({ items }: Props) {
	return (
		<List>
			{items.map((i) => (
				<ListItem key={i} mb={4}>
					<Text>{i}</Text>
				</ListItem>
			))}
		</List>
	);
}
