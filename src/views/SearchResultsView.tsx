import { useContext } from 'react';
import CandidateItem from '../components/common/CandidateItem';
import CandidateList from '../components/common/CandidateList';

import { SearchContext } from '../context/SearchContext';

export default function SearchResultsView() {
	const {
		search: { results },
	} = useContext(SearchContext);

	return results.length > 0 ? <CandidateList userIds={results} /> : <p>No results.</p>;
}
