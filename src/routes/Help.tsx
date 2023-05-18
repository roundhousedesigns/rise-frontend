import Page from '../components/Page';
import { usePostContent } from '../hooks/queries/usePostContent';
import { Container, Spinner } from '@chakra-ui/react';

export default function Help() {
	const [content, { contentLoading, contentError }] = usePostContent('959');

	return (
		<Page title='Help'>
			<Container maxW='4xl'>{contentLoading && !contentError ? <Spinner /> : content}</Container>
		</Page>
	);
}
