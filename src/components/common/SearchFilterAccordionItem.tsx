import { ReactNode } from 'react';
import {
	AccordionItem,
	AccordionButton,
	Heading,
	AccordionIcon,
	AccordionPanel,
	Box,
} from '@chakra-ui/react';

interface Props {
	heading: string;
	headingProps?: any;
	children: ReactNode;
}

export default function SearchFilterAccordionItem({ heading, headingProps, children }: Props) {
	return (
		<AccordionItem>
			<Heading
				as='h3'
				flex='1'
				textAlign='left'
				my={0}
				fontSize='xl'
				lineHeight='normal'
				{...headingProps}
			>
				<AccordionButton>
					<Box as='span' fontWeight='normal'>
						{heading}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</Heading>
			<AccordionPanel pt={0} pb={2} pr={1} pl={0} mt={0} mb={2} fontSize='sm'>
				<Box mt={2}>{children}</Box>
			</AccordionPanel>
		</AccordionItem>
	);
}
