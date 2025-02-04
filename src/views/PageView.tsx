import usePage from '@queries/usePage';
import { ContainerProps, Container, SkeletonText } from '@chakra-ui/react';
import parse from 'html-react-parser';

interface Props {
	postId: string | number;
}

export default function PageView({ postId, ...props }: Props & ContainerProps) {
	const [page, { loading, error }] = usePage(postId);

	const content = page?.content ? parse(page.content) : null;

	return (
		<Container variant={'pageContent'} className={'wp-post-content'} {...props}>
			{loading && !error && page ? <SkeletonText /> : content}
		</Container>
	);
}
