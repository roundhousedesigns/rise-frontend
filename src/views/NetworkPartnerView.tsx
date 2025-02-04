import { Box, Text } from '@chakra-ui/react';
import parse from 'html-react-parser';
import { WPPost } from '@lib/classes';

export default function NetworkPartnerView({ partner }: { partner: WPPost }) {
	return (
		<Box>
			<Text>{partner.title}</Text>
			<Text>{parse(partner.content || '')}</Text>
		</Box>
	);
}
