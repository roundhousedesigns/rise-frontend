import { FiEyeOff, FiEye } from 'react-icons/fi';
import useViewer from '../../hooks/queries/useViewer';
import useToggleDisableProfile from '../../hooks/mutations/useToggleDisableProfile';
import ToggleOptionSwitch from './ToggleOptionSwitch';
import { Box, Text } from '@chakra-ui/react';

interface Props {
	withContainer?: boolean;
	[prop: string]: any;
}

export default function DisableProfileToggle({
	withContainer = false,
	...addlProps
}: Props): JSX.Element {
	const { loggedInId, disableProfile } = useViewer();
	const {
		toggleDisableProfileMutation,
		result: { loading },
	} = useToggleDisableProfile();

	const handleToggleDisableProfile = () => {
		toggleDisableProfileMutation(loggedInId);
	};

	const boxProps = withContainer
		? {
				bg: disableProfile ? 'brand.red' : 'brand.green',
				color: 'text.light',
				borderRadius: 'md',
				m: 0,
				px: 4,
		  }
		: {};

	return (
		<Box {...boxProps} {...addlProps}>
			<ToggleOptionSwitch
				id='disableProfile'
				checked={disableProfile}
				callback={handleToggleDisableProfile}
				label='Visibility'
				icon={disableProfile ? FiEyeOff : FiEye}
				loading={loading}
			>
				<Subtext disableProfile={disableProfile} />
			</ToggleOptionSwitch>
		</Box>
	);
}

const Subtext = ({ disableProfile }: { disableProfile: boolean }) => {
	return disableProfile ? (
		<Text as='span'>
			You're <strong>hidden</strong>, but you can still search.
		</Text>
	) : (
		<Text as='span'>
			You're <strong>visible</strong> in the directory.
		</Text>
	);
};
