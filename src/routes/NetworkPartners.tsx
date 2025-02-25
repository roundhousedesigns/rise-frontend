import NetworkPartnersView from '@views/NetworkPartnersView';
import Shell from '@layout/Shell';

export default function NetworkPartners() {
	return (
		<Shell maxW='none' bgColor={'brand.blue'} fullWidthTemplate={true}>
			<NetworkPartnersView />
		</Shell>
	);
}
