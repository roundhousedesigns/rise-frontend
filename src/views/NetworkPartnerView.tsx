import { Box, Container, Text } from '@chakra-ui/react';
import parse from 'html-react-parser';
import { WPPost } from '@lib/classes';

export default function NetworkPartnerView({ partner }: { partner: WPPost }) {
	return (
		<Container maxW={'3xl'}>
			<Text>{parse(partner.content || '')}</Text>
		</Container>
	);
}
