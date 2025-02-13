import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

interface SEOProps {
	id?: number;
}

const GET_SEO_DATA = gql`
	query GetSEOData($id: ID!) {
		page(id: $id, idType: DATABASE_ID) {
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
`;

export default function SEO({ id }: SEOProps) {
	const { data } = useQuery(GET_SEO_DATA, {
		variables: { id },
		skip: !id,
		ssr: true,
		onError: (error) => {
			console.error('❌ SEO query error:', error);
		},
		onCompleted: (data) => {
			console.log('✅ SEO query completed:', data);
		},
	});

	const seoData = data?.page?.nodes?.[0]?.seo;

	// Only run document modifications on client-side
	useEffect(() => {
		if (typeof window === 'undefined' || !seoData) return;

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
