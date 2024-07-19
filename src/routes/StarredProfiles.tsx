import { Text } from '@chakra-ui/react';
import Page from '@components/Page';
import StarredProfilesView from '@views/StarredProfilesView';
import { FiStar } from 'react-icons/fi';
import InlineIconText from '../components/InlineIconText';

export default function StarredProfiles() {
	const Description = () => (
		<Text my={0} display='flex' alignItems='center' flexWrap='wrap'>
			<InlineIconText
				icon={<FiStar />}
				text='Click the star button next to a profile to pin or unpin it.'
				query='star'
				description='star'
			/>
		</Text>
	);

	return (
		<Page title='Starred Profiles' description={<Description />}>
			<StarredProfilesView />
		</Page>
	);
}
