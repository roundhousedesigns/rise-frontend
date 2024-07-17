import { IconButton, Text } from '@chakra-ui/react';
import Page from '@components/Page';
import StarredProfilesView from '@views/StarredProfilesView';
import { FiStar } from 'react-icons/fi';

export default function StarredProfiles() {
	const Description = () => (
		<Text my={0} display='flex' alignItems='center' flexWrap='wrap'>
			Click the{' '}
			<IconButton
				icon={<FiStar />}
				variant='sampleIconButton'
				title='Star'
				aria-label='Sample star icon'
				isDisabled
				bgColor='blackAlpha.300'
			>
				{' '}
			</IconButton>
			button next to a profile to pin or unpin it.
		</Text>
	);

	return (
		<Page title='Starred Profiles' description={<Description />}>
			<StarredProfilesView />
		</Page>
	);
}
