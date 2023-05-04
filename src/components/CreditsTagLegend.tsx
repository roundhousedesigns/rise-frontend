import { Tag, TagLabel, Wrap } from '@chakra-ui/react';

interface Props {
	[prop: string]: any;
}

export default function CreditsTagLegend({ ...props }: Props) {
	return (
		<Wrap {...props}>
			<Tag colorScheme='orange' size='sm'>
				<TagLabel>Departments</TagLabel>
			</Tag>
			<Tag colorScheme='blue' size='sm'>
				<TagLabel>Jobs</TagLabel>
			</Tag>
			<Tag colorScheme='green' size='sm'>
				<TagLabel>Skills</TagLabel>
			</Tag>
		</Wrap>
	);
}
