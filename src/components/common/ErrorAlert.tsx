import { Alert } from '@chakra-ui/react';

interface Props {
	message: string;
}

export default function ErrorAlert({ message }: Props) {
	return <Alert status='error'>{message}</Alert>;
}
