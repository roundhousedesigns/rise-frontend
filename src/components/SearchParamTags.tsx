import { ReactNode } from 'react';
import { Box, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';

interface Props {
	termIds: number[];
	allTerms: WPItem[];
	[prop: string]: any;
}

export default function SearchParamTags({ termIds, allTerms, ...props }: Props) {
	if (!termIds || !allTerms) return null;

	const terms: WPItem[] = termIds.map(
		(termId) => allTerms.find((term: WPItem) => term.id === termId) as WPItem
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
		<Box {...props}>
			{departments.length ? (
				<Wrap>
					{departments.map((department: WPItem, index: number) => (
						<Tag key={index} colorScheme='orange'>
							<TagLabel>{department.name}</TagLabel>
						</Tag>
					))}
				</Wrap>
			) : (
				false
			)}

			{jobs ? (
				<Wrap>
					{jobs.map((job: WPItem, index: number) => (
						<Tag key={index} colorScheme='blue'>
							<TagLabel>{job.name}</TagLabel>
						</Tag>
					))}
				</Wrap>
			) : (
				false
			)}

			{skills && skills.length > 0 ? (
				<Tag colorScheme='green'>{`Skills: ${skills.length}`}</Tag>
			) : (
				false
			)}

			{filters && filters.length > 0 ? (
				<Tag colorScheme='purple'>{`Filters: ${filters.length}`}</Tag>
			) : (
				false
			)}
		</Box>
	);
}
