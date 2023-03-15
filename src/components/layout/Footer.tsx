import { Stack, Heading, Text } from '@chakra-ui/react';

export default function Footer() {
	return (
		<Stack
			w='full'
			h='20vh'
			py={8}
			alignItems='center'
			justifyContent='center'
			background='brand.cyan'
			_dark={{
				background: 'brand.blue',
			}}
		>
			<Heading variant='pageSubtitle'>GET TO WORK</Heading>
			<Heading variant='pageSubtitle'>DO NOT SHARE</Heading>
			<Text>Thank you for being an alpha tester!</Text>
			<Text>{`Please report all bugs to: <EMAIL>`}</Text>
			<Text fontSize='sm'>GTW Version 0.2.0</Text>
		</Stack>
	);
}
