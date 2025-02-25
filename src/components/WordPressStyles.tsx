// src/components/WordPressStyles.tsx
import { useEffect } from 'react';
import useWp from '@hooks/queries/useWp';

export default function WordPressStyles() {
	const [wpGlobalStylesheet, { loading, error }] = useWp();

	useEffect(() => {
		if (!wpGlobalStylesheet || loading || error) return;

		// Create style element
		const styleElement = document.createElement('style');
		styleElement.setAttribute('id', 'wp-global-styles');
		styleElement.innerHTML = wpGlobalStylesheet;

		// Remove any existing WP styles to prevent duplicates
		const existingStyle = document.getElementById('wp-global-styles');
		if (existingStyle) {
			existingStyle.remove();
		}

		// Add new styles
		document.head.appendChild(styleElement);

		// Cleanup function
		return () => {
			const style = document.getElementById('wp-global-styles');
			if (style) {
				style.remove();
			}
		};
	}, [wpGlobalStylesheet, loading, error]);

	// Component doesn't render anything
	return null;
}
