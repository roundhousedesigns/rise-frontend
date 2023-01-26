import React from 'react';
import {
	Box,
	AccordionItem,
	AccordionIcon,
	AccordionButton,
	AccordionPanel,
} from '@chakra-ui/react';

export default function WidgetAccordionItem({ children, heading }) {
	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Box as="span" flex="1" textAlign="left">
						{heading}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>{children}</AccordionPanel>
		</AccordionItem>
	);
}
