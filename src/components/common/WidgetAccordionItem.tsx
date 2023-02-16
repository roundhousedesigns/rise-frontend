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
				<Box as='span' flex='1' textAlign='left' fontSize='md'>
					{heading}
				</Box>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={2} mb={2} fontSize='sm'>
				{children}
			</AccordionPanel>
		</AccordionItem>
	);
}
