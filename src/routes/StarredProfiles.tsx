import { FiStar } from 'react-icons/fi';
import Shell from '@layout/Shell';
import StarredProfilesView from '@views/StarredProfilesView';
import InlineIconText from '@components/InlineIconText';

export default function StarredProfiles() {
	const Description = () => (
		<InlineIconText
			icon={<FiStar />}
			text={'Click the star button next to a profile to pin or unpin it.'}
			query='star'
			description='star'
			fontSize='md'
		/>
	);

	return (
		<Shell title={'Starred Profiles'} description={<Description />}>
			<StarredProfilesView />
		</Shell>
	);
}
