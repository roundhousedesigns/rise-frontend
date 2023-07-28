import { Box, chakra, Heading, useColorMode } from '@chakra-ui/react';
import parse from 'html-react-parser';
import { WPPost } from '../../lib/classes';

interface Props {
	post: WPPost;
	[prop: string]: any;
}

export default function ShortPost({ post, ...props }: Props) {
	const { id, title, content } = post;
	const { colorMode } = useColorMode();

	return (
		<chakra.div id={id.toString()} {...props}>
			<Heading
				variant='contentTitle'
				px={4}
				py={2}
				mb={4}
				bg={colorMode === 'dark' ? 'blackAlpha.300' : 'blackAlpha.100'}
			>
				{title ? title : ' '}
			</Heading>
			{content && (
				<Box pb={4} px={4}>
					{parse(content)}
				</Box>
			)}
		</chakra.div>
	);
}
