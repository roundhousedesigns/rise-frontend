import { Global } from '@emotion/react';
import useWp from '@queries/useWp';

const Fonts = () => {
	const [{ stylesheetDirectoryUri }, { loading, error }] = useWp();

	if (loading || error) return null;

	return (
		<Global
			styles={`
			/* latin */
			@font-face {
				font-family: 'Victor Serif';
				font-style: normal;
				font-weight: normal;
				font-display: swap;
				src: url('${stylesheetDirectoryUri}/assets/fonts/VictorSerif-50Medium.woff2') format('woff2'), 
					 url('${stylesheetDirectoryUri}/assets/fonts/VictorSerif-50Medium.woff') format('woff');
				unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
			}
			/* latin */
			@font-face {
				font-family: 'Victor Serif';
				font-style: italic;
				font-weight: normal;
				font-display: swap;
				src: url('${stylesheetDirectoryUri}/assets/fonts/VictorSerif-55MediumItalic.woff2') format('woff2'),
					 url('${stylesheetDirectoryUri}/assets/fonts/VictorSerif-55MediumItalic.woff') format('woff');
				unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
			}
		`}
		/>
	);
};

export default Fonts;
