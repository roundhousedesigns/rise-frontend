import { Text, Link, Box, Container, LightMode } from '@chakra-ui/react';
const { VITE_APP_VERSION, VITE_DEV_MODE } = import.meta.env;

export default function Footer() {
	return (
		<LightMode>
			<Box w='full' minH='20vh' py={8} alignItems='center' bgColor='brand.orange'>
				<Container maxW='6xl' textAlign='center'>
					<Text align='center'>
						{/* TODO make this a backend field */}
						RISE Theatre is a program of Maestra Music Inc, a 501c3 non-profit charitable
						organization (EIN: 83-3439518)
					</Text>
					<Text>
						©2023{' '}
						<Link href='https://maestramusic.org' isExternal>
							Maestra Music Inc.
						</Link>{' '}
						|{' '}
						<Link href='https://risetheatre.org/terms-conditions' isExternal>
							Terms & Conditions
						</Link>{' '}
						|{' '}
						<Link href='https://www.risetheatre.org/privacy-policy' isExternal>
							Privacy Policy
						</Link>
					</Text>
					<Text>
						Site by{' '}
						<Link href='https://roundhouse-designs.com' isExternal>
							Roundhouse Designs
						</Link>
					</Text>
					<Text fontSize='sm' mt={8}>
						{`Please report all bugs to: `}
						<Link href='mailto:support@risetheatre.org'>support@risetheatre.org</Link> | Version{' '}
						{VITE_APP_VERSION}
						{VITE_DEV_MODE ? ' (dev)' : ''}
					</Text>
				</Container>
			</Box>
		</LightMode>
	);
}
