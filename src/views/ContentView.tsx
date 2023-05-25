import { usePostContent } from '../hooks/queries/usePostContent';
import { Box, SkeletonText } from '@chakra-ui/react';

interface Props {
	postId: string | number;
}

export default function ContentView({ postId }: Props) {
	const [content, { contentLoading, contentError }] = usePostContent(postId);

	return (
		<Box mt={4} pt={4} borderTopStyle='solid' borderTopWidth={2}>
			{contentLoading && !contentError ? <SkeletonText /> : content}
		</Box>
	);
}
