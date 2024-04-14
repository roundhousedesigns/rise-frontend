import { Box } from '@chakra-ui/react';
import { FiUser, FiUsers } from 'react-icons/fi';
import useViewer from '@hooks/queries/useViewer';
import useToggleIsOrg from '@hooks/mutations/useToggleIsOrg';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';

interface Props {
	size?: string;
	showLabel?: boolean;
	showHelperText?: boolean;
	[prop: string]: any;
}

export default function IsOrgToggle({
	size = 'md',
	showLabel,
	showHelperText,
	...props
}: Props): JSX.Element {
	const { loggedInId, isOrg } = useViewer();
	const {
		toggleIsOrgMutation,
		result: { loading },
	} = useToggleIsOrg();

	const handleToggleIsOrganization = () => {
		toggleIsOrgMutation(loggedInId);
	};

	const helperText =
		showHelperText && isOrg
			? 'This profile is for an organization. You won\'t appear in searches.'
			: showHelperText && !isOrg
			? 'This profile is for a person.'
			: '';

	return (
		<Box {...props}>
			<ToggleOptionSwitch
				id='isOrg'
				checked={isOrg}
				callback={handleToggleIsOrganization}
				label={isOrg ? 'Company profile' : 'Individual profile'}
				iconLeft={FiUser}
				iconRight={FiUsers}
				size={size}
				loading={loading}
				showLabel={showLabel}
				helperText={helperText}
			/>
		</Box>
	);
}
