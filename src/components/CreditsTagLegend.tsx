import { Wrap } from '@chakra-ui/react';
import WPItemBadgeListItem from '@common/WPItemBadgeListItem';

interface Props {
	[prop: string]: any;
}

export default function CreditsTagLegend({ ...props }: Props) {
	return (
		<Wrap {...props}>
			<WPItemBadgeListItem colorScheme='orange' fontSize='xs'>
				Departments
			</WPItemBadgeListItem>
			<WPItemBadgeListItem colorScheme='blue' fontSize='xs'>
				Jobs
			</WPItemBadgeListItem>
			<WPItemBadgeListItem colorScheme='green' fontSize='xs'>
				Skills
			</WPItemBadgeListItem>
		</Wrap>
	);
}
