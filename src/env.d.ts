/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_BACKEND_URL: string;
	readonly VITE_FRONTEND_URL: string;
	readonly VITE_GA4_ID: string;
	readonly VITE_RECAPTCHA_SITE_KEY: string;
	readonly VITE_UW_ACCOUNT: string;
	readonly VITE_DEV_MODE: boolean;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

import 'vite/client';
