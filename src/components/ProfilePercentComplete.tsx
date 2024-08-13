import { Text, Progress, Box } from '@chakra-ui/react';
import useViewer from '@queries/useViewer';
import { useProfileCompletion } from '@hooks/hooks';

const ProfilePercentComplete = () => {
	const [{ loggedInId }] = useViewer();
	const percentComplete = useProfileCompletion(loggedInId);

	return (
		<Box>
			<Progress hasStripe value={percentComplete} colorScheme='yellow' position='relative' />
			<Text m={0} fontSize='xs' textAlign='right' fontStyle='italic'>
				{`Profile ${percentComplete}% complete`}
			</Text>
		</Box>
	);
};

export default ProfilePercentComplete;
