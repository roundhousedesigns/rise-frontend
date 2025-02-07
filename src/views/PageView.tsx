import usePageById from '@@/src/hooks/queries/usePageById';
import { ContainerProps, Container, Heading } from '@chakra-ui/react';
import { WPPost } from '@lib/classes';
import parse from 'html-react-parser';

interface Props {
	postId?: string | number;
	pageObject?: WPPost;
}

export default function PageView({ postId, pageObject, ...props }: Props & ContainerProps) {
	const [pageById] = usePageById(!!pageObject ? 0 : Number(postId));

	const page = pageObject || pageById;

	const content = page?.content ? parse(page.content) : null;

	return (
		<Container variant={'pageContent'} className={'wp-post-content'} {...props}>
			<Heading as={'h1'}>{page?.title}</Heading>
			{content}
		</Container>
	);
}
