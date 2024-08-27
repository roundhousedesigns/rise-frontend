// Modernized reportWebVitals
import { Metric } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
	if (onPerfEntry && typeof onPerfEntry === 'function') {
		import('web-vitals').then((vitals) => {
			vitals.onCLS(onPerfEntry);
			vitals.onFID(onPerfEntry);
			vitals.onFCP(onPerfEntry);
			vitals.onLCP(onPerfEntry);
			vitals.onTTFB(onPerfEntry);
		});
	}
};

export default reportWebVitals;
