import { Text, Progress, Box, ProgressProps } from '@chakra-ui/react';
import useViewer from '@queries/useViewer';
import { useProfileCompletion } from '@hooks/hooks';

const ProfilePercentComplete = ({ ...props }: ProgressProps) => {
	const [{ loggedInId }] = useViewer();
	const percentComplete = useProfileCompletion(loggedInId);

	return (
		<Box>
			<Progress value={percentComplete} position='relative' {...props} />
			<Text mt={1} mb={0} fontSize='2xs' textAlign='right' fontStyle='italic'>
				{`Profile ${percentComplete}% complete`}
			</Text>
		</Box>
	);
};

export default ProfilePercentComplete;
