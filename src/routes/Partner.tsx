import { useParams } from 'react-router-dom';
import useNetworkPartnerIdBySlug from '@queries/useNetworkPartnerIdBySlug';
import useNetworkPartners from '@queries/useNetworkPartners';
import NetworkPartnerView from '@views/NetworkPartnerView';
import Shell from '@layout/Shell';

export default function Partner() {
	const params = useParams();
	const slug = params.slug ? params.slug : '';
	const [networkPartnerId] = useNetworkPartnerIdBySlug(slug);
	const [networkPartners, { loading }] = useNetworkPartners(networkPartnerId || 0);

	const title = !networkPartners.length ? '' : networkPartners[0].title;

	return (
		<Shell title={title} loading={!!loading}>
			<NetworkPartnerView partner={networkPartners[0]} />
		</Shell>
	);
}
