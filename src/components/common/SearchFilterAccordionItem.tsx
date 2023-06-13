import { ReactNode } from 'react';
import {
	AccordionItem,
	AccordionButton,
	Heading,
	AccordionIcon,
	AccordionPanel,
} from '@chakra-ui/react';

interface Props {
	heading: string;
	headingProps?: any;
	children: ReactNode;
}

export default function SearchFilterAccordionItem({ heading, headingProps, children }: Props) {
	return (
		<AccordionItem>
			<AccordionButton>
				<Heading
					flex='1'
					textAlign='left'
					my={0}
					fontSize='xl'
					lineHeight='normal'
					{...headingProps}
				>
					{heading}
				</Heading>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={2} pl={0} pr={1} mb={2} fontSize='sm'>
				{children}
			</AccordionPanel>
		</AccordionItem>
	);
}
