import { Text, Progress, Box } from '@chakra-ui/react';
import useViewer from '@queries/useViewer';
import { useProfileCompletion } from '@hooks/hooks';

const ProfilePercentComplete = ({ ...props }: { [prop: string]: any }) => {
	const [{ loggedInId }] = useViewer();
	const percentComplete = useProfileCompletion(loggedInId);

	return (
		<Box>
			<Text variant={'helperText'}>Complete your profile!</Text>
			<Progress hasStripe value={percentComplete} position={'relative'} {...props} />
			<Text m={0} fontSize={'xs'} textAlign={'right'} fontStyle={'italic'}>
				{`${percentComplete}%`}
			</Text>
		</Box>
	);
};

export default ProfilePercentComplete;
