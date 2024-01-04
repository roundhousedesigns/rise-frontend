import { chakra, Text } from '@chakra-ui/react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import useViewer from '@hooks/queries/useViewer';
import useToggleDisableProfile from '@hooks/mutations/useToggleDisableProfile';
import ToggleOptionSwitch from './common/ToggleOptionSwitch';

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
		<chakra.div {...props}>
			<ToggleOptionSwitch
				id='disableProfile'
				checked={!disableProfile}
				callback={handleToggleDisableProfile}
				label='Visibility'
				icon={disableProfile ? FiEyeOff : FiEye}
				loading={loading}
			>
				<Text as='span'>
					Profile visibility
					<Text as='span' fontSize='xs' fontStyle='italic' color='inherit' pl={2}>
						<Subtext disableProfile={disableProfile} />
					</Text>
				</Text>
			</ToggleOptionSwitch>
		</chakra.div>
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
