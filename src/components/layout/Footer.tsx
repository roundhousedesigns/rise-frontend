import { ReactNode } from 'react';
import { Text, Link, Box, Container, LightMode } from '@chakra-ui/react';
import useFrontendSetting from '@hooks/queries/useFrontendSetting';
import { Dot } from '@common/icons/Dot';

interface FooterLinkProps {
	href?: string;
	isExternal?: boolean;
	children: ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps): JSX.Element {
	return (
		<Link href={href} color='inherit' isExternal>
			{children}
		</Link>
	);
}

export default function Footer() {
	const { value: footerNotice } = useFrontendSetting('footer_notice');

	const year = new Date().getFullYear();

	return (
		<LightMode>
			<Box w='full' py={4} alignItems='center' bgColor='brand.orange' fontSize='sm'>
				<Container maxW='6xl' textAlign='center'>
					<Text align='center'>{footerNotice}</Text>
					<Text>
						&copy; {year}{' '}
						<FooterLink href='https://maestramusic.org'>Maestra Music Inc.</FooterLink>
						<Dot boxSize={1} />
						<FooterLink href='https://risetheatre.org/terms-conditions'>
							Terms & Conditions
						</FooterLink>
						<Dot boxSize={1} />
						<FooterLink href='https://risetheatre.org/privacy-policy'>Privacy Policy</FooterLink>
					</Text>
					<Text>
						By <FooterLink href='https://roundhouse-designs.com'>Roundhouse Designs</FooterLink>
					</Text>
				</Container>
			</Box>
		</LightMode>
	);
}
