import { Wrap, Tag, TagLabel } from '@chakra-ui/react';
import { WPItem } from '../../lib/classes';
import { decodeString } from '../../lib/utils';

interface Props {
	items: WPItem[];
	colorScheme?: string;
	[props: string]: any;
}

export default function WPItemBadgeList({ items, colorScheme, ...props }: Props): JSX.Element {
	return (
		<Wrap spacing={2} justify={{ base: 'left', md: 'right' }} {...props}>
			{items?.map((item: WPItem) => (
				<Tag key={item.id} colorScheme={colorScheme}>
					<TagLabel>{decodeString(item.name)}</TagLabel>
				</Tag>
			))}
		</Wrap>
	);
}
