// src/components/WordPressStyles.tsx
import { useEffect } from 'react';
import useWp from '@hooks/queries/useWp';

export default function WordPressStyles() {
	const [wp, { loading, error }] = useWp();

	useEffect(() => {
		if (!wp || loading || error) return;

		// Create style element
		const styleElement = document.createElement('style');
		styleElement.setAttribute('id', 'wp-global-styles');
		styleElement.innerHTML = wp.globalStylesheet ? wp.globalStylesheet : '';

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
	}, [wp, loading, error]);

	// Component doesn't render anything
	return null;
}
