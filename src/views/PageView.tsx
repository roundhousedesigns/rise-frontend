import usePageById from '@@/src/hooks/queries/usePageById';
import { ContainerProps, Container, Heading, HeadingProps } from '@chakra-ui/react';
import { WPPost } from '@lib/classes';
import parse from 'html-react-parser';

interface Props {
	postId?: string | number;
	pageObject?: WPPost;
	showTitle?: boolean;
	titleProps?: HeadingProps;
}

export default function PageView({
	postId,
	pageObject,
	showTitle = true,
	titleProps,
	...props
}: Props & ContainerProps) {
	const [pageById] = usePageById(!!pageObject ? 0 : Number(postId));

	const page = pageObject || pageById;

	const content = page?.content ? parse(page.content) : null;

	return (
		<Container variant='pageContent' className={'wp-post-content'} {...props}>
			{showTitle && (
				<Heading as='h1' {...titleProps}>
					{page?.title}
				</Heading>
			)}
			{content}
		</Container>
	);
}
