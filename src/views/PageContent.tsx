import usePageById from '@queries/usePageById';
import { ContainerProps, Container, Heading, HeadingProps } from '@chakra-ui/react';
import { WPPost } from '@lib/classes';
import parse from 'html-react-parser';

interface Props {
	postId?: string | number;
	pageObject?: WPPost;
	titleProps?: HeadingProps;
}

export default function PageContent({
	postId,
	pageObject,
	titleProps,
	...props
}: Props & ContainerProps) {
	const [pageById] = usePageById(!!pageObject ? 0 : Number(postId));

	const page = pageObject || pageById;

	const content = page?.content ? parse(page.content) : null;

	return (
		<Container variant='pageContent' className={'wp-post-content'} {...props}>
			<Heading as='h1' {...titleProps}>
				{page?.title}
			</Heading>
			{content}
		</Container>
	);
}
