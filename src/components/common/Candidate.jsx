import React from 'react';
import { Card } from '@chakra-ui/react';

// A candidate with image, name, and some data.

export default function Candidate({ item }) {
	return <Card py={2}>{item}</Card>;
}
