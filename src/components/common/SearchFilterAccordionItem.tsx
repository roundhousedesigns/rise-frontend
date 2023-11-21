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
				mb={0}
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
			<AccordionPanel pb={2} pl={0} pr={1} mb={2} fontSize='sm'>
				{children}
			</AccordionPanel>
		</AccordionItem>
	);
}
