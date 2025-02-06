import NetworkPartnersView from '@views/NetworkPartnersView';
import Page from '@components/Page';

export default function Partners() {
	return (
		<Page
			maxW='none'
			fullWidthTemplate={true}
			titleContainerWidth={'5xl'}
			bgColor={'brand.blue'}
			title='Network Partners'
			titleProps={{ color: 'text.light' }}
		>
			{/* We're setting the title in the NetworkPartnersView component for layout reasons. */}
			<NetworkPartnersView />
		</Page>
	);
}
