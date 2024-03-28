import { Box, Highlight, Text } from '@chakra-ui/react';
import { FiUserCheck, FiUserMinus } from 'react-icons/fi';
import useViewer from '@hooks/queries/useViewer';
import useToggleUnavailableForWork from '@hooks/mutations/useToggleLookingForWork';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';

interface Props {
	size?: string;
	showLabel?: boolean;
	showHelperText?: boolean;
	[prop: string]: any;
}

export default function UnavailableForWorkToggle({
	size = 'md',
	showLabel,
	showHelperText,
	...props
}: Props): JSX.Element {
	const { loggedInId, unavailable } = useViewer();
	const {
		toggleUnavailableForWorkMutation,
		result: { loading },
	} = useToggleUnavailableForWork();

	const handleToggleUnavailableForWork = () => {
		toggleUnavailableForWorkMutation(loggedInId);
	};

	return (
		<Box {...props}>
			<ToggleOptionSwitch
				id='unavailable'
				checked={unavailable}
				callback={handleToggleUnavailableForWork}
				label='Availability'
				icon={FiUserMinus}
				iconRight={FiUserCheck}
				size={size}
				loading={loading}
				showLabel={showLabel}
			>
				<>{showHelperText ? <Description unavailable={unavailable} /> : <></>}</>
			</ToggleOptionSwitch>
		</Box>
	);
}

const Description = ({ unavailable }: { unavailable: boolean }) => {
	return unavailable ? (
		<Text as='span'>
			<Highlight query={['available']} styles={{ bg: 'blue.200', px: 1, mx: 0 }}>
				You're available for work right now.
			</Highlight>
		</Text>
	) : (
		<Text as='span'>
			<Highlight query={['busy', 'unavailable']} styles={{ bg: 'blue.200', px: 1, mx: 0 }}>
				You're currently busy or unavailable for work.
			</Highlight>
		</Text>
	);
};
