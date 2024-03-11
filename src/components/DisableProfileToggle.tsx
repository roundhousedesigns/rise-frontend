import { Box, Highlight, Text } from '@chakra-ui/react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import useViewer from '@hooks/queries/useViewer';
import useToggleDisableProfile from '@hooks/mutations/useToggleDisableProfile';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';

interface Props {
	size?: string;
	showLabel?: boolean;
	[prop: string]: any;
}

export default function DisableProfileToggle({
	size = 'md',
	showLabel,
	...props
}: Props): JSX.Element {
	const { loggedInId, disableProfile } = useViewer();
	const {
		toggleDisableProfileMutation,
		result: { loading },
	} = useToggleDisableProfile();

	const handleToggleDisableProfile = () => {
		toggleDisableProfileMutation(loggedInId);
	};

	return (
		<Box {...props}>
			<ToggleOptionSwitch
				id='disableProfile'
				checked={!disableProfile}
				callback={handleToggleDisableProfile}
				label='Visibility'
				icon={FiEyeOff}
				iconRight={FiEye}
				size={size}
				loading={loading}
			>
				{showLabel ? <Subtext disableProfile={disableProfile} /> : <></>}
			</ToggleOptionSwitch>
		</Box>
	);
}

const Subtext = ({ disableProfile }: { disableProfile: boolean }) => {
	return disableProfile ? (
		<Text as='span'>
			<Highlight query={['private', 'hidden']} styles={{ bg: 'blue.200', px: 1, mx: 0 }}>
				Your profile is private and you won't appear in searches.
			</Highlight>
		</Text>
	) : (
		<Text as='span'>
			<Highlight query={['public']} styles={{ bg: 'blue.200', px: 1, mx: 0 }}>
				Your profile is public and you'll appear in searches.
			</Highlight>
		</Text>
	);
};
