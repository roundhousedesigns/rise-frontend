import { Flex, Tag, TagLabel } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import { ReactNode } from 'react';

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

	const departments: WPItem[] = terms
		.filter((term) => term.taxonomyName === 'position')
		.reduce((positions: WPItem[], term: WPItem) => {
			const termToAdd = term.parent || term;
			if (!positions.find((item) => item.id === termToAdd.id)) {
				positions.push(termToAdd);
			}
			return positions;
		}, []);

	const jobs = terms.filter((term) => {
		return term.taxonomyName === 'position' && term.parent;
	});

	const skills = terms.filter((term) => term.taxonomyName === 'skill');

	const filters = terms.filter(
		(term) => term.taxonomyName !== 'position' && term.taxonomyName !== 'skill'
	);

	// Collect term badges.
	const TermTags = () => {
		const tags: ReactNode[] = [];

		if (departments && departments.length) {
			tags.push(
				departments.map(
					(department: WPItem, index: number): ReactNode => (
						<Tag key={index} colorScheme='orange' size='sm' {...tagProps}>
							<TagLabel>{department.name}</TagLabel>
						</Tag>
					)
				)
			);
		}

		if (jobs && jobs.length) {
			tags.push(
				jobs.map(
					(job: WPItem, index: number): ReactNode => (
						<Tag key={index} colorScheme='blue' size='sm' {...tagProps}>
							<TagLabel>{job.name}</TagLabel>
						</Tag>
					)
				)
			);
		}

		if (skills && skills.length) {
			tags.push(
				skills.map(
					(skill: WPItem, index: number): ReactNode => (
						<Tag key={index} colorScheme='green' size='sm' {...tagProps}>
							<TagLabel>{skill.name}</TagLabel>
						</Tag>
					)
				)
			);
		}

		if (filters && filters.length > 0) {
			tags.push(
				filters.map(
					(filter: WPItem, index: number): ReactNode => (
						<Tag key={index} colorScheme='purple' size='sm' {...tagProps}>
							<TagLabel>{filter.name}</TagLabel>
						</Tag>
					)
				)
			);
		}

		return tags;
	};

	return (
		<Flex flexWrap='wrap' gap={1} alignItems='center' {...props}>
			<TermTags />
		</Flex>
	);
}
