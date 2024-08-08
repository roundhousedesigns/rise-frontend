import { Box, chakra, Heading } from '@chakra-ui/react';
import parse from 'html-react-parser';
import { WPPost } from '@lib/classes';

interface Props {
	post: WPPost;
	[prop: string]: any;
}

export default function ShortPost({ post, ...props }: Props) {
	const { id, title, content } = post;

	return (
		<chakra.div id={id.toString()} {...props}>
			<Heading variant='contentTitle' py={2}>
				{title ? title : ' '}
			</Heading>
			{content && <Box>{parse(content)}</Box>}
		</chakra.div>
	);
}
