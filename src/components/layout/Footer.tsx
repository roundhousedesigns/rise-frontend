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
			<Heading variant='pageSubtitle'>Footer</Heading>
			<Text>Stuff and things!</Text>
		</Stack>
	);
}
