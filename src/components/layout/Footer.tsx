import { ReactNode } from 'react';
import { Text, Link, Box, Container, LightMode } from '@chakra-ui/react';
import useFrontendSetting from '@/hooks/queries/useFrontendSetting';

interface FooterLinkProps {
	href?: string;
	isExternal?: boolean;
	children: ReactNode;
}

function FooterLink({ href, isExternal = true, children }: FooterLinkProps): JSX.Element {
	return (
		<Link
			href={href}
			isExternal={isExternal}
			textDecoration='none'
			_hover={{ textDecoration: 'underline' }}
		>
			{children}
		</Link>
	);
}

export default function Footer() {
	const { value: footerNotice } = useFrontendSetting('footer_notice');

	return (
		<LightMode>
			<Box w='full' py={4} alignItems='center' bgColor='brand.orange' fontSize='sm'>
				<Container maxW='6xl' textAlign='center'>
					<Text align='center'>{footerNotice}</Text>
					<Text>
						©2023{' '}
						<FooterLink href='https://maestramusic.org' isExternal>
							Maestra Music Inc.
						</FooterLink>{' '}
						|{' '}
						<FooterLink href='https://risetheatre.org/terms-conditions' isExternal>
							Terms & Conditions
						</FooterLink>{' '}
						|{' '}
						<FooterLink href='https://www.risetheatre.org/privacy-policy' isExternal>
							Privacy Policy
						</FooterLink>
					</Text>
					<Text>
						Site by{' '}
						<FooterLink href='https://roundhouse-designs.com' isExternal>
							Roundhouse Designs
						</FooterLink>
					</Text>
				</Container>
			</Box>
		</LightMode>
	);
}
