import { ReactNode } from 'react';
import { Box, BoxProps, Heading } from '@chakra-ui/react';
import HeadingCenterline from '@common/HeadingCenterline';

interface Props {
	title?: string;
	centerlineColor?: string;
	children: ReactNode;
}

export default function ProfileStackItem({
	title,
	centerlineColor,
	children,
	...props
}: Props & BoxProps): JSX.Element {
	const SectionTitle = () => {
		return centerlineColor ? (
			<HeadingCenterline lineColor={centerlineColor} mb={1}>
				{title}
			</HeadingCenterline>
		) : (
			<Heading as='h3' variant='pageSubtitle'>
				{title}
			</Heading>
		);
	};

	return (
		<Box {...props}>
			{title ? <SectionTitle /> : false}
			{children}
		</Box>
	);
}
