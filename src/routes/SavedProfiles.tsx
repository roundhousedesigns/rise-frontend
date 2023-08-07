import { useEffect } from 'react';
import Page from '../components/Page';
import SavedProfilesView from '../views/SavedProfilesView';

export default function SavedProfiles() {
	return (
		<Page title='Saved Profiles'>
			<SavedProfilesView />
		</Page>
	);
}
