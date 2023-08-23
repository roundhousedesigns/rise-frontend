import { FiEyeOff, FiEye } from 'react-icons/fi';
import useViewer from '../../hooks/queries/useViewer';
import useToggleDisableProfile from '../../hooks/mutations/useToggleDisableProfile';
import ToggleOptionSwitch from './ToggleOptionSwitch';
import { Box } from '@chakra-ui/react';

interface Props {
	[prop: string]: any;
}

export default function DisableProfileToggle({ ...props }: Props): JSX.Element {
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
				checked={disableProfile}
				callback={handleToggleDisableProfile}
				label='Search Only'
				subtext={`You are ${disableProfile ? 'hidden from' : 'visible in'} directory searches .`}
				icon={disableProfile ? FiEyeOff : FiEye}
				loading={loading}
			/>
		</Box>
	);
}
