import { Flex, FlexProps, Tag, TagLabel, TagProps } from '@chakra-ui/react';
import { WPItem } from '@lib/classes';
import { ReactNode } from 'react';

interface Props {
	termIds: number[];
	termItems: WPItem[];
	tagProps?: TagProps;
}

export default function SearchParamTags({
	termIds,
	termItems,
	tagProps,
	...props
}: Props & FlexProps): JSX.Element | null {
	if (!termIds.length || !termItems.length) return null;

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

	/**
	 * Renders tags based on the provided items and color scheme.
	 */
	const renderTags = (items: WPItem[], colorScheme?: string): ReactNode[] => {
		return items.map(({ id, name }) => (
			<Tag key={id} colorScheme={colorScheme} size='sm' {...tagProps}>
				<TagLabel>{name}</TagLabel>
			</Tag>
		));
	};

	/**
	 * Generates an array of React nodes representing tags based on the provided items and color scheme.
	 */
	const termTags = (): ReactNode[] | undefined => {
		const departmentTags = renderTags(departments, 'orange');
		const jobTags = renderTags(jobs, 'blue');
		const skillTags = renderTags(skills, 'green');
		const filterTags = renderTags(filters, 'purple');

		if (!departmentTags.length && !jobTags.length && !skillTags.length && !filterTags.length)
			return [];

		if (departmentTags.length || jobTags.length || skillTags.length || filterTags.length)
			return [departmentTags, jobTags, skillTags, filterTags];
	};

	return (
		<Flex flexWrap='wrap' gap={1} alignItems='center' {...props}>
			{termTags()?.map((tag: ReactNode) => tag)}
		</Flex>
	);
}
