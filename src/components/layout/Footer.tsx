import { ReactNode } from 'react';
import { Text, Link, Box, Container, LightMode, Flex } from '@chakra-ui/react';
import useFrontendSetting from '@queries/useFrontendSetting';
import RiseStar from '@common/icons/RiseStar';

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
			<Box w='full' py={4} bgColor={'brand.orange'} fontSize='md'>
				<Container maxW='5xl' textAlign='center'>
					<Text align='center'>{footerNotice}</Text>
					<Flex justifyContent='center' alignItems='center'>
						&copy; {year}{' '}
						<FooterLink href={'https://maestramusic.org'}>Maestra Music Inc.</FooterLink>
						<RiseStar fontSize='xs' />
						<FooterLink href={'https://risetheatre.org/terms-conditions'}>
							Terms & Conditions
						</FooterLink>
						<RiseStar fontSize='xs' />
						<FooterLink href={'https://risetheatre.org/privacy-policy'}>Privacy Policy</FooterLink>
					</Flex>
					<Text>
						<FooterLink href={'https://roundhouse-designs.com'}>Made by Roundhouse Designs</FooterLink>
					</Text>
				</Container>
			</Box>
		</LightMode>
	);
}
