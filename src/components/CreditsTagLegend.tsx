import { Wrap, WrapProps } from '@chakra-ui/react';
import WPItemBadgeListItem from '@common/WPItemBadgeListItem';

export default function CreditsTagLegend({ ...props }: WrapProps) {
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
