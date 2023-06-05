import { Text, Link, Box, Container, LightMode } from '@chakra-ui/react';

export default function Footer() {
	const { VITE_DEV_MODE } = import.meta.env;

	const DevModeMessage = () => {
		return VITE_DEV_MODE ? (
			<Text fontSize='5xl' color='text.dark' textAlign='center' textTransform='uppercase' mb={8}>
				Frontend Staging
			</Text>
		) : (
			<></>
		);
	};

	return (
		<LightMode>
			<Box w='full' minH='20vh' py={8} alignItems='center' bgColor='brand.orange'>
				<DevModeMessage />

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
						<Link href='mailto:support@risetheatre.org'>support@risetheatre.org</Link>
						{VITE_DEV_MODE ? ' (dev)' : ''}
					</Text>
				</Container>
			</Box>
		</LightMode>
	);
}
