import NetworkPartnersView from '@views/NetworkPartnersView';
import Shell from '@layout/Shell';

export default function Partners() {
	return (
		<Shell
			maxW='none'
			fullWidthTemplate={true}
			titleContainerWidth={'5xl'}
			bgColor={'brand.blue'}
			titleProps={{ color: 'text.light' }}
		>
			<NetworkPartnersView />
		</Shell>
	);
}
