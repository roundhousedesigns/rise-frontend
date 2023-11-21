import { Flex, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';

interface Props {
	termIds: number[];
	termItems: WPItem[];
	tagProps?: {
		[prop: string]: any;
	};
	[prop: string]: any;
}

export default function SearchParamTags({ termIds, termItems, tagProps, ...props }: Props) {
	if (!termIds || !termItems) return null;

	const terms: WPItem[] = termIds.map(
		(termId) => termItems.find((term: WPItem) => term.id === termId) as WPItem
	);

	const departments: WPItem[] = [];
	terms.forEach((term) => {
		const { taxonomyName } = term;
		if (taxonomyName !== 'position') return;

		if (term.parent) {
			departments.push(term.parent);
		} else {
			departments.push(term);
		}
	});

	const jobs = terms.filter((term) => {
		return term.taxonomyName === 'position' && term.parent;
	});

	const skills = terms.filter((term) => term.taxonomyName === 'skill');

	const filters = terms.filter(
		(term) => term.taxonomyName !== 'position' && term.taxonomyName !== 'skill'
	);

	return (
		<Flex flexWrap='wrap' gap={1} alignItems='center' {...props}>
			{/* <Text as='span' my={0} fontWeight='bold'>
				&bull;
			</Text> */}
			{departments.length ? (
				<Wrap spacing={1}>
					{departments.map((department: WPItem, index: number) => (
						<Tag key={index} colorScheme='orange' size='sm' {...tagProps}>
							<TagLabel>{department.name}</TagLabel>
						</Tag>
					))}
				</Wrap>
			) : (
				false
			)}

			{jobs.length ? (
				<Wrap spacing={1}>
					{jobs.map((job: WPItem, index: number) => (
						<Tag key={index} colorScheme='blue' size='sm' {...tagProps}>
							<TagLabel>{job.name}</TagLabel>
						</Tag>
					))}
				</Wrap>
			) : (
				false
			)}

			{skills.length ? (
				<Wrap spacing={1}>
					{skills.map((skill: WPItem, index: number) => (
						<Tag key={index} colorScheme='green' size='sm' {...tagProps}>
							<TagLabel>{skill.name}</TagLabel>
						</Tag>
					))}
				</Wrap>
			) : (
				false
			)}

			{filters && filters.length > 0 ? (
				<Text fontSize='sm' color='gray.500' my={0} fontStyle='italic'>
					{filters.length === 1 ? '+1 additional filter' : `+${filters.length} additional filters`}
				</Text>
			) : (
				false
			)}
		</Flex>
	);
}
