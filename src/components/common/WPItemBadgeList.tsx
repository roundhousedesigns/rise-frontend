import { Wrap, WrapProps } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import { decodeString } from '@lib/utils';
import WPItemBadgeListItem from '@common/WPItemBadgeListItem';

interface Props {
	items: WPItem[];
	colorScheme?: string;
}

export default function WPItemBadgeList({
	items,
	colorScheme,
	...props
}: Props & WrapProps): JSX.Element {
	return (
		<Wrap spacing={2} justify={{ base: 'left', md: 'right' }} {...props}>
			{items?.map((item: WPItem) => (
				<WPItemBadgeListItem key={item.id} id={item.id.toString()} colorScheme={colorScheme}>
					{decodeString(item.name || '')}
				</WPItemBadgeListItem>
			))}
		</Wrap>
	);
}
