import { Heading, StackItem } from '@chakra-ui/react';
import HeadingCenterline from '@common/HeadingCenterline';

interface Props {
	title?: string;
	centerlineColor?: string;
	visible?: boolean;
	children: JSX.Element;
	[prop: string]: any;
}

// A StackItem with a title and optional centerline.
export default function ProfileStackItem({
	title,
	centerlineColor,
	visible = true,
	children,
	...props
}: Props) {
	const SectionTitle = () => {
		return centerlineColor ? (
			<HeadingCenterline lineColor={centerlineColor} mb={1}>
				{title}
			</HeadingCenterline>
		) : (
			<Heading as='h3' variant='contentTitle'>
				{title}
			</Heading>
		);
	};

	return visible ? (
		<StackItem mb={2} {...props}>
			{title ? <SectionTitle /> : false}
			{children}
		</StackItem>
	) : null;
}
