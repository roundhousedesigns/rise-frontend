import { Box } from '@chakra-ui/react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import useViewer from '@hooks/queries/useViewer';
import useToggleLookingForWork from '@hooks/mutations/useToggleLookingForWork';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';

interface Props {
	size?: string;
	showLabel?: boolean;
	showHelperText?: boolean;
	[prop: string]: any;
}

export default function LookingForWorkToggle({
	size = 'md',
	showLabel,
	showHelperText,
	...props
}: Props): JSX.Element {
	const { loggedInId, lookingForWork } = useViewer();
	const {
		toggleLookingForWorkMutation,
		result: { loading },
	} = useToggleLookingForWork();

	const handleToggleLookingForWork = () => {
		toggleLookingForWorkMutation(loggedInId);
	};

	const helperText =
		showHelperText && lookingForWork
			? "You're looking for work right now."
			: showHelperText && !lookingForWork
			? "You're not looking for work right now."
			: '';

	return (
		<Box {...props}>
			<ToggleOptionSwitch
				id='lookingForWork'
				checked={lookingForWork}
				callback={handleToggleLookingForWork}
				label='Availability'
				iconLeft={FiThumbsDown}
				iconRight={FiThumbsUp}
				size={size}
				loading={loading}
				showLabel={showLabel}
				helperText={helperText}
			/>
		</Box>
	);
}
