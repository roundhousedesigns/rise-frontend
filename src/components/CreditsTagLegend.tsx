import { Tag, TagLabel, Wrap } from '@chakra-ui/react';

export default function CreditsTagLegend() {
	return (
		<Wrap>
			<Tag colorScheme='orange' size='sm'>
				<TagLabel>Departments</TagLabel>
			</Tag>
			<Tag colorScheme='cyan' size='sm'>
				<TagLabel>Jobs</TagLabel>
			</Tag>
			<Tag colorScheme='teal' size='sm'>
				<TagLabel>Skills</TagLabel>
			</Tag>
		</Wrap>
	);
}
