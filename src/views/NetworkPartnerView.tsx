import { ContainerProps, Container, Heading, HeadingProps } from '@chakra-ui/react';
import parse from 'html-react-parser';
import { WPPost } from '@lib/classes';
import useNetworkPartners from '../hooks/queries/useNetworkPartners';
import { useEffect, useState } from 'react';

interface Props {
	postId?: string | number;
	titleProps?: HeadingProps;
}

export default function NetworkPartnerView({
	postId,
	titleProps,
	...props
}: Props & ContainerProps) {
	const [pages] = useNetworkPartners(Number(postId));
	const [page, setPage] = useState<WPPost | null>(null);

	useEffect(() => {
		if (pages.length > 0 && !page) {
			setPage(pages[0]);
		}
	}, [pages, page]);

	const content = page?.content ? parse(page.content) : null;

	return (
		<Container variant='pageContent' className={'wp-post-content'} {...props}>
			<Heading as='h1' mb={4} {...titleProps}>
				{page?.title}
			</Heading>
			{content}
		</Container>
	);
}
