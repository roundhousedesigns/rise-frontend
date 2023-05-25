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
	children: React.ReactNode;
}

export default function SearchFilterAccordionItem({ heading, headingProps, children }: Props) {
	return (
		<AccordionItem>
			<AccordionButton pl={0}>
				<Heading flex='1' textAlign='left' my={0} fontSize='xl' lineHeight='normal' {...headingProps}>
					{heading}
				</Heading>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={2} mb={2} fontSize='sm'>
				{children}
			</AccordionPanel>
		</AccordionItem>
	);
}
