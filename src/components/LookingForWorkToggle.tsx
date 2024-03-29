import { Box, Highlight, Text } from '@chakra-ui/react';
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
			>
				<>{showHelperText ? <Description lookingForWork={lookingForWork} /> : <></>}</>
			</ToggleOptionSwitch>
		</Box>
	);
}

const Description = ({ lookingForWork }: { lookingForWork: boolean }) => {
	return lookingForWork ? (
		<Text as='span'>
			<Highlight query={['looking for work']} styles={{ bg: 'brand.yellow', px: 1, mx: 0 }}>
				You're looking for work right now.
			</Highlight>
		</Text>
	) : (
		<Text as='span'>
			<Highlight query={['not']} styles={{ bg: 'brand.yellow', px: 1, mx: 0 }}>
				You're not looking for work right now.
			</Highlight>
		</Text>
	);
};
