import { Text } from '@chakra-ui/react';
import StarredProfileList from '@views/StarredProfileList';
import useViewer from '@hooks/queries/useViewer';

export default function StarredProfilesView() {
	const [{ starredProfiles }] = useViewer();

	return (
		<>
			{starredProfiles && starredProfiles.length === 0 ? (
				<Text size='sm' my={0} display='flex' alignItems='center' flexWrap='wrap'>
					No saved profiles.
				</Text>
			) : null}

			<StarredProfileList my={8} />
		</>
	);
}
