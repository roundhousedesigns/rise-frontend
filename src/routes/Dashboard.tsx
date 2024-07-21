import Page from '@components/Page';

import useViewer from '@queries/useViewer';
import DashboardView from '@views/DashboardView';

export default function Dashboard() {
	const [{ firstName }] = useViewer();

	return (
		<Page title={`Hello, ${firstName}!`}>
			<DashboardView />
		</Page>
	);
}
