import { Tag, TagLabel, TagProps } from '@chakra-ui/react';

interface Props {
	colorScheme?: string;
}

export default function WPItemBadgeListItem({
	children,
	colorScheme,
	...props
}: Props & TagProps): JSX.Element {
	return (
		<Tag colorScheme={colorScheme} {...props}>
			<TagLabel>{children}</TagLabel>
		</Tag>
	);
}
