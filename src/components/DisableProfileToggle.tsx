import { Box } from '@chakra-ui/react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { deleteCookie, setCookie } from '@lib/utils';
import useViewer from '@hooks/queries/useViewer';
import useToggleDisableProfile from '@hooks/mutations/useToggleDisableProfile';
import ToggleOptionSwitch from '@common/ToggleOptionSwitch';

interface Props {
	size?: string;
	showLabel?: boolean;
	showHelperText?: boolean;
	[prop: string]: any;
}

export default function DisableProfileToggle({
	size = 'md',
	showLabel,
	showHelperText,
	...props
}: Props): JSX.Element {
	const { loggedInId, disableProfile } = useViewer();
	const {
		toggleDisableProfileMutation,
		result: { loading },
	} = useToggleDisableProfile();

	const noticeLabel = 'profile_notice_profile_disabled_dismissed';

	const handleToggleDisableProfile = () => {
		toggleDisableProfileMutation(loggedInId);

		if (disableProfile === true) setCookie(noticeLabel, 1, 30);
		else deleteCookie(noticeLabel);
	};

	const helperText =
		showHelperText && disableProfile
			? "Your profile is private and you won't appear in searches."
			: showHelperText && !disableProfile
			? "Your profile is public  and you'll appear in searches."
			: '';

	return (
		<Box {...props}>
			<ToggleOptionSwitch
				id='disableProfile'
				checked={!disableProfile}
				callback={handleToggleDisableProfile}
				label='Privacy'
				iconLeft={FiEyeOff}
				iconRight={FiEye}
				size={size}
				loading={loading}
				helperText={helperText}
				showLabel={showLabel}
			/>
		</Box>
	);
}
