import { FiEyeOff, FiEye } from 'react-icons/fi';
import useViewer from '../../hooks/queries/useViewer';
import useToggleHideProfile from '../../hooks/mutations/useToggleHideProfile';
import ToggleOptionSwitch from './ToggleOptionSwitch';

export default function HideProfileToggle() {
	const { loggedInId, hideProfile } = useViewer();
	const {
		toggleHideProfileMutation,
		result: { loading },
	} = useToggleHideProfile();

	const handleToggleHideProfile = () => {
		toggleHideProfileMutation(loggedInId);
	};

	return (
		<ToggleOptionSwitch
			id='hideProfile'
			checked={hideProfile}
			callback={handleToggleHideProfile}
			label='Hide Profile'
			subtext={`Your profile is currently ${hideProfile ? 'hidden' : 'visible'}`}
			icon={hideProfile ? FiEyeOff : FiEye}
			loading={loading}
		/>
	);
}
