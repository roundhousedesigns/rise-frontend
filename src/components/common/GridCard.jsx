import React from 'react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';

export default function GridCard({ heading, children }) {
	return (
		<Card px={2} py={6}>
			<CardHeader>{heading}</CardHeader>
			<CardBody>{children}</CardBody>
		</Card>
	);
}
