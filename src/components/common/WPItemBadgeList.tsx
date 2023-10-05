import { Wrap, Tag, TagLabel } from '@chakra-ui/react';
import { WPItem } from '../../lib/classes';
import { decodeString } from '../../lib/utils';
import WPItemBadgeListItem from './WPItemBadgeListItem';

interface Props {
	items: WPItem[];
	colorScheme?: string;
	[props: string]: any;
}

export default function WPItemBadgeList({ items, colorScheme, ...props }: Props): JSX.Element {
	return (
		<Wrap spacing={2} justify={{ base: 'left', md: 'right' }} {...props}>
			{items?.map((item: WPItem) => (
				<WPItemBadgeListItem key={item.id} id={item.id} colorScheme={colorScheme}>
					{decodeString(item.name)}
				</WPItemBadgeListItem>
			))}
		</Wrap>
	);
}
