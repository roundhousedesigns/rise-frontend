import NetworkPartnersView from '@views/NetworkPartnersView';
import Shell from '@layout/Shell';

export default function Partners() {
	console.info('Partners');
	return (
		<Shell maxW='none' bgColor={'brand.blue'} fullWidthTemplate={true}>
			<NetworkPartnersView />
		</Shell>
	);
}
