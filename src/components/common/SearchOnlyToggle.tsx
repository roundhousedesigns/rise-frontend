import { FiEyeOff, FiEye } from 'react-icons/fi';
import useViewer from '../../hooks/queries/useViewer';
import useToggleSearchOnly from '../../hooks/mutations/useToggleSearchOnly';
import ToggleOptionSwitch from './ToggleOptionSwitch';

export default function SearchOnlyToggle() {
	const { loggedInId, searchOnly } = useViewer();
	const {
		toggleSearchOnlyMutation,
		result: { loading },
	} = useToggleSearchOnly();

	const handleToggleSearchOnly = () => {
		toggleSearchOnlyMutation(loggedInId);
	};

	return (
		<ToggleOptionSwitch
			id='searchOnly'
			checked={searchOnly}
			callback={handleToggleSearchOnly}
			label='Search Only'
			subtext={`(${searchOnly ? 'Your profile is hidden' : 'Your profile is visible'})`}
			icon={searchOnly ? FiEyeOff : FiEye}
			loading={loading}
		/>
	);
}
