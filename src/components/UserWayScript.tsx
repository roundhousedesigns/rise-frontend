import { getViewportPointFromEvent } from '@chakra-ui/utils';
import React from 'react';
const { VITE_UW_ACCOUNT } = import.meta.env;

const UserWayScript = () => {
	React.useEffect(() => {
		const script = document.createElement('script');
		script.setAttribute('data-account', VITE_UW_ACCOUNT);
		script.setAttribute('src', 'https://cdn.userway.org/widget.js');

		// script.setAttribute('data-position', '1'); // override default position
		// script.setAttribute('data-size', 'small'); // override default size
		// script.setAttribute('data-language', 'fr'); // override default language
		// script.setAttribute('data-color', '#053e67'); // override color set via widget
		// script.setAttribute('data-type', '1'); // override type set via widget
		// script.setAttribute('data-statement_text', 'Our Accessibility Statement'); // override statement text
		// script.setAttribute('data-statement_url', 'http://www.example.com/accessibility'); // override statement URL
		// script.setAttribute('data-mobile', 'true'); // override support on mobile devices
		// script.setAttribute('data-trigger', 'triggerId'); // set custom trigger action for accessibility menu
		(document.body || document.head).appendChild(script);
	}, []);

	return null;
};

export default UserWayScript;
