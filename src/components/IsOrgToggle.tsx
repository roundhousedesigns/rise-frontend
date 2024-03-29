import { Box, Highlight, Text } from '@chakra-ui/react';
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

	return (
		<Box {...props}>
			<ToggleOptionSwitch
				id='isOrg'
				checked={isOrg}
				callback={handleToggleIsOrganization}
				label='Company profile'
				iconLeft={FiUser}
				iconRight={FiUsers}
				size={size}
				loading={loading}
				showLabel={showLabel}
			>
				<>{showHelperText ? <Description isOrg={isOrg} /> : <></>}</>
			</ToggleOptionSwitch>
		</Box>
	);
}

const Description = ({ isOrg }: { isOrg: boolean }) => {
	return isOrg ? (
		<Text as='span'>
			<Highlight query={['organization']} styles={{ bg: 'brand.yellow', px: 1, mx: 0 }}>
				This profile is for an organization.
			</Highlight>
		</Text>
	) : (
		<Text as='span'>
			<Highlight query={['individual']} styles={{ bg: 'brand.yellow', px: 1, mx: 0 }}>
				This profile is for an individual.
			</Highlight>
		</Text>
	);
};
