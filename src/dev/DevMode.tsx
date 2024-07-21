import { ReactNode } from 'react';
const { VITE_DEV_MODE } = import.meta.env;

const DevMode = ({ children }: { children: ReactNode }): JSX.Element =>
	VITE_DEV_MODE === 'true' ? <>{children}</> : <></>;

export default DevMode;
