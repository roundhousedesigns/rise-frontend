import { IconButton, Text } from '@chakra-ui/react';
import StarredProfileList from '@views/StarredProfileList';
import useViewer from '@hooks/queries/useViewer';
import { FiStar } from 'react-icons/fi';

export default function StarredProfilesView() {
	const { starredProfiles } = useViewer();
	return (
		<>
			{starredProfiles.length === 0 ? (
				<Text size='sm' my={0} display='flex' alignItems='center' flexWrap='wrap'>
					No saved profiles. Click a{' '}
					<IconButton
						icon={<FiStar />}
						variant='sampleIconButton'
						mx={1}
						aria-label='Sample unclickable star icon'
						title='Star'
						bgColor='gray.200'
						color='text.dark'
					/>{' '}
					to save a profile to your list.
				</Text>
			) : (
				false
			)}

			<StarredProfileList my={8} />
		</>
	);
}
