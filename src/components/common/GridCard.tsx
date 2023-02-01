import { Card, CardHeader, CardBody } from '@chakra-ui/react';

interface Props {
	heading: string;
	children: React.ReactNode;
}

export default function GridCard({ heading, children }: Props) {
	return (
		<Card px={2} py={6}>
			<CardHeader>{heading}</CardHeader>
			<CardBody>{children}</CardBody>
		</Card>
	);
}
