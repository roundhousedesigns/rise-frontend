import { Box, BoxProps, Heading } from '@chakra-ui/react';

interface Props {
	id: string;
	heading?: string;
	children: JSX.Element;
}

export default function SearchFilterSection({
	id,
	heading,
	children,
	...props
}: Props & BoxProps): JSX.Element {
	return (
		<Box id={id} {...props}>
			{heading ? (
				<Heading as='h3' variant='searchFilterTitle'>
					{heading}
				</Heading>
			) : (
				false
			)}
			{children}
		</Box>
	);
}
