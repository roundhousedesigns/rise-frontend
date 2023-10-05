import { Tag, TagLabel } from '@chakra-ui/react';

interface Props {
	colorScheme?: string;
	[props: string]: any;
}

export default function WPItemBadgeListItem({
	children,
	colorScheme,
	...props
}: Props): JSX.Element {
	return (
		<Tag colorScheme={colorScheme} {...props}>
			<TagLabel>{children}</TagLabel>
		</Tag>
	);
}
