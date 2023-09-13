import { ReactNode } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { WPItem } from '../../lib/classes';

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
	<>
		<Text as='span' fontWeight='bold'>
			{title}:&nbsp;
		</Text>
		<Text as='span' pr={2}>
			{children}
		</Text>
	</>
);

interface Props {
	termIds: number[];
	allTerms: WPItem[];
	[prop: string]: any;
}

export default function ReadableSearchString({ termIds, allTerms, ...props }: Props) {
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

	const departmentString = departments
		.map((department) => {
			return department.name;
		})
		.join('/');
	const jobString = jobs.map((job) => job.name).join('/');
	const skillString = skills.map((skill) => skill.name).join(', ');
	const otherString = filters.map((other) => other.name).join(', ');

	return (
		<Box {...props}>
			{departmentString ? <Section title='Department'>{departmentString}</Section> : null}
			{jobString ? <Section title='Job'>{jobString}</Section> : null}
			{skillString ? <Section title='Skill'>{skillString}</Section> : null}
			{otherString ? <Section title='Filters'>{otherString}</Section> : null}
		</Box>
	);
}
