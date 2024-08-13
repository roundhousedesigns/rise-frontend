import usePostContent from '@queries/usePostContent';
import { Box, SkeletonText } from '@chakra-ui/react';

interface Props {
	postId: string | number;
	[prop: string]: any;
}

export default function ContentView({ postId, ...props }: Props) {
	const [content, { contentLoading, contentError }] = usePostContent(postId);

	return (
		<Box mt={4} pt={4} className={'wp-post-content'} {...props}>
			{contentLoading && !contentError ? <SkeletonText /> : content}
		</Box>
	);
}
