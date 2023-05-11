import { Text, Link, Box, Container } from '@chakra-ui/react';

export default function Footer() {
	return (
		<Box
			w='full'
			minH='20vh'
			py={8}
			alignItems='center'
			_light={{ background: 'brand.blue', color: 'text.dark' }}
			_dark={{ background: 'brand.green', color: 'text.light' }}
			fontSize='sm'
		>
			<Container maxW='6xl' textAlign='center'>
				<Text align='center'>
					RISE Theatre is a program of Maestra Music Inc, a 501c3 non-profit charitable organization
					(EIN: 83-3439518)
				</Text>
				<Text fontSize='xs'>
					<Link href='http://risetheartre.org/terms-conditions' isExternal variant='footer'>
						Terms &amp; Conditions
					</Link>
				</Text>
				<Text>
					{`Please report all bugs to: `}
					<Link href='mailto:info@risetheatre.org' variant='footer'>
						info@risetheatre.org
					</Link>
				</Text>
				<Text fontSize='xs'>
					©2023{' '}
					<Link href='https://maestramusic.org' isExternal variant='footer'>
						Maestra Music Inc
					</Link>
					. | Site by{' '}
					<Link href='https://roundhouse-designs.com' isExternal variant='footer'>
						Roundhouse Designs
					</Link>
				</Text>
			</Container>
		</Box>
	);
}
