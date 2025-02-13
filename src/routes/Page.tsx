import usePageBySlug from '@queries/usePageBySlug';
import { useParams } from 'react-router-dom';
import NotFound from '@routes/NotFound';
import Shell from '@layout/Shell';
import PageView from '@views/PageView';
import LoggedIn from '@components/LoggedIn';
import SEO from '@components/SEO';

export default function Page() {
	const params = useParams();
	const slug = params.slug ? params.slug : undefined;

	const [page, { loading }] = usePageBySlug(slug);

	return (
		<Shell loading={loading} fullWidthTemplate>
			{page && page.id !== 0 ? (
				page.status === 'publish' ? (
					<>
						<SEO id={page.id} />
						<PageView postId={page.id} />
					</>
				) : (
					<LoggedIn>
						<PageView postId={page.id} />
					</LoggedIn>
				)
			) : (
				<NotFound />
			)}
		</Shell>
	);
}
