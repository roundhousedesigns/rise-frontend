import { Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { WPItem } from '../../lib/classes';

interface Props {
	termIds: number[];
	allTerms: WPItem[];
}
export default function ReadableSearchString({ termIds, allTerms }: Props) {
	if (!allTerms) return null;

	const terms: WPItem[] = termIds.map(
		(termId) => allTerms.find((term: WPItem) => term.id === termId) as WPItem
	);

	const departments: WPItem[] = [];
	terms.forEach((term) => {
		const { taxonomyName } = term;
		if (taxonomyName !== 'position') return;

		departments.push(term.parent);
	});
	const jobs = terms.filter((term) => {
		return term.taxonomyName === 'position' && term.parent;
	});
	const skills = terms.filter((term) => term.taxonomyName === 'skill');
	const others = terms.filter(
		(term) => term.taxonomyName !== 'position' && term.taxonomyName !== 'skill'
	);

	const departmentString = departments.map((department) => department.name).join('/');
	const jobString = jobs.map((position) => position.name).join('/');
	const skillString = skills.map((skill) => skill.name).join(', ');
	const otherString = others.map((other) => other.name).join(', ');

	return (
		<>
			{departmentString ? <Section title='Department'>{departmentString}</Section> : null}
			{jobString ? <Section title='Job'>{jobString}</Section> : null}
			{skillString ? <Section title='Skill'>{skillString}</Section> : null}
			{otherString ? <Section title='Other'>{otherString}</Section> : null}
		</>
	);
}

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
	<Text as='span'>
		<Text as='span' fontWeight='bold'>
			{title}:&nbsp;
		</Text>
		<Text as='span' pr={2}>
			{children}
		</Text>
	</Text>
);
