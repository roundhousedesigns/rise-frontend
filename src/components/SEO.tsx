import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

interface SEOProps {
	slug?: string;
}

const GET_SEO_DATA = gql`
	query GetSEOData($slug: String) {
		page(where: { name: $slug }) {
			nodes {
				seo {
					title
					metaDesc
					metaKeywords
					metaRobotsNoindex
					metaRobotsNofollow
					opengraphTitle
					opengraphDescription
					opengraphImage {
						sourceUrl
					}
					twitterTitle
					twitterDescription
					twitterImage {
						sourceUrl
					}
					canonical
				}
			}
		}
	}
`;

export default function SEO({ slug }: SEOProps) {
	const { data } = useQuery(GET_SEO_DATA, {
		variables: { slug },
		skip: !slug,
	});

	const seoData = data?.page?.nodes?.[0]?.seo;

	useEffect(() => {
		if (!seoData) return;

		// Update meta tags
		document.title = seoData.title;

		const metaTags = {
			description: seoData.metaDesc,
			keywords: seoData.metaKeywords,
			robots: `${seoData.metaRobotsNoindex ? 'noindex' : 'index'},${
				seoData.metaRobotsNofollow ? 'nofollow' : 'follow'
			}`,
			'og:title': seoData.opengraphTitle,
			'og:description': seoData.opengraphDescription,
			'og:image': seoData.opengraphImage?.sourceUrl,
			'twitter:title': seoData.twitterTitle,
			'twitter:description': seoData.twitterDescription,
			'twitter:image': seoData.twitterImage?.sourceUrl,
		};

		// Update existing or create new meta tags
		Object.entries(metaTags).forEach(([name, content]) => {
			if (!content) return;

			let meta = document.querySelector(`meta[name="${name}"]`);
			if (!meta) {
				meta = document.createElement('meta');
				meta.setAttribute('name', name);
				document.head.appendChild(meta);
			}
			meta.setAttribute('content', content);
		});

		// Handle canonical URL
		let canonical = document.querySelector('link[rel="canonical"]');
		if (!canonical && seoData.canonical) {
			canonical = document.createElement('link');
			canonical.setAttribute('rel', 'canonical');
			document.head.appendChild(canonical);
		}
		if (canonical && seoData.canonical) {
			canonical.setAttribute('href', seoData.canonical);
		}
	}, [seoData]);

	return null;
}
