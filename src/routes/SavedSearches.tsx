import Shell from '@layout/Shell';
import SavedSearchesView from '@views/SavedSearchesView';

export default function SavedSearches() {
	return (
		<Shell
			title={'Your Searches'}
			description='Save your searches to easily repeat them. To save one, click the "Save" button at the top of
				the Search Results page.'
		>
			<SavedSearchesView />
		</Shell>
	);
}
