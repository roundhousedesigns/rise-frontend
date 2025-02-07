import { ReactNode } from 'react';
import {
	AccordionItem,
	AccordionButton,
	Heading,
	AccordionIcon,
	AccordionPanel,
	Box,
	Text,
	AccordionPanelProps,
	AccordionButtonProps,
} from '@chakra-ui/react';

interface Props {
	heading: string | JSX.Element;
	headingProps?: Partial<AccordionButtonProps>;
	panelProps?: Partial<AccordionPanelProps>;
	children: ReactNode;
	isDisabled?: boolean;
	[prop: string]: any;
}

export default function SearchFilterAccordionItem({
	heading,
	headingProps,
	panelProps,
	children,
	isDisabled,
	...props
}: Props) {
	const HeadingContent = (): JSX.Element =>
		typeof heading === 'object' ? (
			heading
		) : (
			<Text
				as='span'
				textAlign='left'
				fontWeight='normal'
				my={0}
				fontSize={headingProps?.fontSize ? headingProps.fontSize : 'inherit'}
				lineHeight='normal'
			>
				{heading}
			</Text>
		);

	return (
		<AccordionItem {...props}>
			<Heading as='h3' flex='1' my={0}>
				<AccordionButton {...headingProps} disabled={isDisabled}>
					<HeadingContent />
					<AccordionIcon />
				</AccordionButton>
			</Heading>
			<AccordionPanel pt={0} pb={2} pr={1} pl={0} mt={0} mb={2} fontSize='sm' {...panelProps}>
				<Box mt={2}>{children}</Box>
			</AccordionPanel>
		</AccordionItem>
	);
}
