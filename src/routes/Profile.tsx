import React from 'react';
import Page from '../components/common/Page';
import ProfileView from '../views/ProfileView';

import { _devProfileData, _devCreditsData } from '../lib/_devData';

export default function Profile() {
	return (
		<Page title='My Profile'>
			<ProfileView profile={_devProfileData} credits={_devCreditsData} />
		</Page>
	);
}
