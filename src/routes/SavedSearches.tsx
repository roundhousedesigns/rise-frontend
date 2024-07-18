import Page from '@components/Page';
import SavedSearchesView from '@views/SavedSearchesView';

export default function SavedSearches() {
	return (
		<Page
			title='Your Searches'
			description='Save your searches to easily repeat them. To save one, click the "Save" button at the top of
				the Search Results page.'
		>
			<SavedSearchesView />
		</Page>
	);
}
