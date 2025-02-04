import { Container, Text } from '@chakra-ui/react';
import parse from 'html-react-parser';
import { WPPost } from '@lib/classes';

export default function NetworkPartnerView({ partner }: { partner: WPPost }) {
	const { content } = partner;

	return (
		<Container variant={'pageContent'} className={'wp-post-content'}>
			<Text variant={'postExcerpt'}>{parse(content || '')}</Text>
		</Container>
	);
}
