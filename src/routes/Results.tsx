import Shell from '@layout/Shell';
import SearchResultsView from '@views/SearchResultsView';

export default function Search() {
	return (
		<Shell title={'Search Results'}>
			<SearchResultsView />
		</Shell>
	);
}
