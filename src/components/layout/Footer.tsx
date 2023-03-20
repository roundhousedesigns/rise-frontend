import { Stack, Heading, Text, Link } from '@chakra-ui/react';

export default function Footer() {
	return (
		<Stack
			w='full'
			minH='20vh'
			py={8}
			alignItems='center'
			justifyContent='center'
			background='brand.cyan'
			_dark={{
				background: 'brand.blue',
			}}
		>
			<Heading variant='pageSubtitle' fontSize='4xl' mb={4}>
				DO NOT SHARE
			</Heading>
			<Text>Thank you for being an alpha tester!</Text>
			<Text>
				{`Please report all bugs to: `}
				<Link href='mailto:info@gettowork.org'>info@gettowork.org</Link>
			</Text>
			<Text fontSize='sm'>GTW Version 0.2.0</Text>
		</Stack>
	);
}
