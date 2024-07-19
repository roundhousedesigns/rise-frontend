import { ReactNode } from 'react';
const { VITE_RISE_DEV_MODE } = import.meta.env;

export default function DevMode({ children }: { children: ReactNode }): JSX.Element | null {
	return VITE_RISE_DEV_MODE ? <>{children}</> : <></>;
}
