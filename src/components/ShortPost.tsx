import { Box, Card, CardHeader, CardProps, Heading, useColorMode } from '@chakra-ui/react';
import parse from 'html-react-parser';
import { WPPost } from '@lib/classes';

interface Props {
	post: WPPost;
}

export default function ShortPost({ post, ...props }: Props & CardProps): JSX.Element {
	const { id, title, content } = post;

	const { colorMode } = useColorMode();

	return (
		<Card id={id.toString()} pt={0} px={0} my={0} gap={2} {...props}>
			<CardHeader px={3} py={2} bg={colorMode === 'dark' ? 'blackAlpha.300' : 'blackAlpha.100'}>
				<Heading variant='contentSubtitle' my={0}>
					{title ? title : ' '}
				</Heading>
			</CardHeader>
			{content ? (
				<Box my={0} px={3}>
					{parse(content)}
				</Box>
			) : null}
		</Card>
	);
}
