import { useParams } from 'react-router-dom';
import useNetworkPartnerIdBySlug from '@queries/useNetworkPartnerIdBySlug';
import Shell from '@layout/Shell';
import NetworkPartnerView from '../views/NetworkPartnerView';

export default function NetworkPartner() {
	const params = useParams();
	const slug = params.slug ? params.slug : '';
	const [networkPartnerId, { loading }] = useNetworkPartnerIdBySlug(slug);

	return (
		<Shell loading={!!loading} fullWidthTemplate>
			{networkPartnerId && (
				<NetworkPartnerView postId={networkPartnerId} titleProps={{ textAlign: 'center' }} />
			)}
		</Shell>
	);
}
