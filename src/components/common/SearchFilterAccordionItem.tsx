import { ReactNode } from 'react';
import {
	AccordionItem,
	AccordionButton,
	Heading,
	AccordionIcon,
	AccordionPanel,
	Box,
	Text,
} from '@chakra-ui/react';

interface Props {
	heading: string;
	headingProps?: {
		[prop: string]: any;
	};
	panelProps?: {
		[prop: string]: any;
	};
	children: ReactNode;
	[prop: string]: any;
}

export default function SearchFilterAccordionItem({
	heading,
	headingProps,
	panelProps,
	children,
	...props
}: Props) {
	return (
		<AccordionItem {...props}>
			<Heading as='h3' flex='1' my={0}>
				<AccordionButton {...headingProps}>
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
					<AccordionIcon />
				</AccordionButton>
			</Heading>
			<AccordionPanel pt={0} pb={2} pr={1} pl={0} mt={0} mb={2} fontSize='sm' {...panelProps}>
				<Box mt={2}>{children}</Box>
			</AccordionPanel>
		</AccordionItem>
	);
}
