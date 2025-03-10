import { Box, Heading } from '@chakra-ui/react';
import HeadingCenterline from '@common/HeadingCenterline';

// A custom Box (stack item) with a title and optional centerline.
export default function ProfileStackItem({
	title,
	centerlineColor,
	children,
	...props
}: {
	title?: string;
	centerlineColor?: string;
	children: JSX.Element;
	[prop: string]: any;
}) {
	const SectionTitle = () => {
		return centerlineColor ? (
			<HeadingCenterline lineColor={centerlineColor} mb={1}>
				{title}
			</HeadingCenterline>
		) : (
			<Heading as={'h3'} variant={'contentTitle'}>
				{title}
			</Heading>
		);
	};

	return (
		<Box mb={2} {...props}>
			{title ? <SectionTitle /> : false}
			{children}
		</Box>
	);
}
