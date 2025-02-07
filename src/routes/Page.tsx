import usePageBySlug from '@queries/usePageBySlug';
import Shell from '@layout/Shell';
import { useParams } from 'react-router-dom';
import PageView from '../views/PageView';

export default function Page() {
	const params = useParams();
	const slug = params.slug ? params.slug : '';

	const [page, { loading }] = usePageBySlug(slug);

	return (
		<Shell loading={loading} fullWidthTemplate>
			{page && <PageView postId={page.id} />}
		</Shell>
	);
}
