import React from 'react';
import {
	Box,
	AccordionItem,
	AccordionIcon,
	AccordionButton,
	AccordionPanel,
} from '@chakra-ui/react';

interface Props {
	heading: string;
	children: React.ReactNode;
}

export default function WidgetAccordionItem({ heading, children }: Props) {
	return (
		<AccordionItem>
			<AccordionButton>
				<Box as='span' flex='1' textAlign='left'>
					{heading}
				</Box>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={4} mb={4}>
				{children}
			</AccordionPanel>
		</AccordionItem>
	);
}
