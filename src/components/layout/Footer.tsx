import { Text, Link, Box, Container, LightMode } from '@chakra-ui/react';
import useFrontendSetting from '@/hooks/queries/useFrontendSetting';

export default function Footer() {
	const { value: footerNotice } = useFrontendSetting('footer_notice');

	return (
		<LightMode>
			<Box w='full' minH='20vh' py={8} alignItems='center' bgColor='brand.orange'>
				<Container maxW='6xl' textAlign='center'>
					<Text align='center'>{footerNotice}</Text>
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
				</Container>
			</Box>
		</LightMode>
	);
}
